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

        //initialize payment
        $url = "https://test.oppwa.com/v1/checkouts";
        $data = "entityId=8a8294174d0595bb014d05d829cb01cd" .
            "&amount=92.00" .
            "&currency=SAR" .
            "&paymentType=DB";




        $response = Http::post($url, [
            'headers' => [
                'Authorization' => 'Bearer OGE4Mjk0MTc0ZDA1OTViYjAxNGQwNWQ4MjllNzAxZDF8OVRuSlBjMm45aA==',
            ],
            'form_params' => $data,
        ]);

        dd($response);

        $order->paymentId = $response->json()['id'];
        $order->save();


        //redirect to invoice page
        return redirect()->route('invoice', ['orderId' => $order->id]);

    }

    public function invoice(Request $request, $orderId){
        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);


        $order = Order::find($orderId);

        $type = $order->type;
        $paymentId = $order->paymentId;
        $totalPrice = $order->totalPrice;
        $address = $order->address;
        $notes = $order->notes;


        return Inertia::render('Invoice/index',[
            'categories' => $categories,
            'branches' => $branches ,
            'selectedBranch' => $selectedBranch,
            'type' => $type,
            'paymentId' => $paymentId,
            'totalPrice' => $totalPrice,
            'address' => $address,
            'notes' => $notes,
            ] );
    }
}
