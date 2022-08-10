<?php

namespace App\Http\Controllers;

use App\Actions\GetCustomerSelectedBranch;
use App\Http\Controllers\ModelsCRUD\BranchController;
use App\Models\Order;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CheckoutViewController extends Controller
{
    public function index(Request $request){
        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);


       $cartController = new CartController();

        $cartTotal = $cartController->getCartTotalWithoutVAT($request);

        $VAT = floatval(Settings::where('name', 'VATPercentage')->first()->value);
        $VATTotal = round($cartTotal * $VAT,2);

        $shippingCost = intval(Settings::where('name', 'shippingCost')->first()->value);

        $shippingCities = explode(',',Settings::where('name', 'shippingCities')->first()->value);



        return Inertia::render('Checkout/index',['categories' => $categories, 'branches' => $branches ,'selectedBranch' => $selectedBranch, 'cartTotal' => $cartTotal, 'cities' => $shippingCities , 'deliveryCost' => $shippingCost, 'vatCost' => $VATTotal  ] );
    }

    public function createOrder(Request $request){


        //create order
        $orderController = new OrderController();
        $order = $orderController->createOrder($request);



        $response = Http::withHeaders([
            'Authorization' => config('app.gatewayKey'),
        ])->asForm()->post(config('app.gatewayURL') . 'checkouts',[
            'entityId' => config('app.gatewayEntityId'),
            'amount' => $order->totalPrice,
            'currency' => 'SAR',
            'paymentType' => 'DB',
        ]);



        $order->paymentId = $response->json()['id'];
        $order->save();


        //redirect to invoice page
        return redirect()->route('invoice', ['orderId' => $order->id]);

    }

    public function invoice(Request $request){
        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);


        $orderId = $request->orderId;
        $order = Order::find($orderId);

        $type = $order->type;
        $paymentId = $order->paymentId;
        $totalPrice = $order->totalPrice;
        $address = $order->address;
        $notes = $order->notes;
        $phone = $order->phone;



        return Inertia::render('Invoice/index',[
            'categories' => $categories,
            'branches' => $branches ,
            'selectedBranch' => $selectedBranch,
            'type' => $type,
            'paymentID' => $paymentId,
            'totalPrice' => $totalPrice,
            'address' => $address,
            'notes' => $notes,
            'phone' => $phone,
            ] );
    }

    public function confirmPayment(Request $request){
        if ($request->has('id')){
            $order = Order::where('paymentId', $request->id)->first();
        }

        $orderId = $order->id;
        $orderTotal = $order->totalPrice;


        //check if order is paid

        $url = 'https://test.oppwa.com' . $request->resourcePath;

        $response = Http::withHeaders([
            'Authorization' => config('app.gatewayKey'),
        ])->asForm()->get($url ,[
            'entityId' => config('app.gatewayEntityId'),
        ]);

        //check if order is paid
        if (
            $response->json()['result']['code'] == '000.100.110'
            and $response->json()['amount'] == $orderTotal
            and $response->json()['currency'] == 'SAR'
        )
        {
            $order->status = 'processing';
        }


        //store payment id in order
        $order->paymentId = $response->json()['id'];

        $order->save();

        //update branch products quantity
        $branch = $order->branch;
        $products = $order->products;
        foreach ($products as $product){
            $branch->inventory()->updateExistingPivot($product->id, ['quantity' => $branch->inventory()->find($product->id)->pivot->quantity - $product->pivot->quantity]);
        }

        //empty cart
        $cartController = new CartController();
        $cartController->emptyCart($request);


        return redirect()->route('tracking', ['id' => $orderId]);

    }
}
