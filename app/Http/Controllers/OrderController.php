<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Settings;
use Illuminate\Http\Request;
use Zorb\Promocodes\Models\Promocode;

class OrderController extends Controller
{

    public function getAllOrders()
    {
        $orders = Order::where('status', '!=', 'unpaid')->paginate(15)->through(function ($order) {

            $customerName = $order->customer?->name;
            return [
                'id' => $order->id,
                'status' => $order->status,
                'customerName' => $customerName?$customerName:'ضيف',
                'phone' => $order->phone,
                'branch' => $order->branch->name,
                'total' => $order->total,
            ];
        });
        return $orders;
    }

    public function getOrder($id)
    {
        $order = Order::find($id);

        $customerName = $order->customer?->name;

        $order->customerName = $customerName?$customerName:'ضيف';
        $order->branch = $order->branch->name;

        return $order;
    }
    public function createOrder(Request $request){

        $request->validate([
            'isDelivery' => ['required', 'boolean'],
            'deliveryCity' => 'required_if:isDelivery,true',
            'promocode' => ['nullable', 'string', 'max:255' ],
            'notes' => 'nullable|string|max:255',
            'phone' => 'required|string|max:255',
        ]);

        $cartController = new CartController();

        $cart = $cartController->getCart($request);

        //calculate total price
        $totalPrice = $cartController->getCartTotalWithVAT($request);

        //if promocode is applied, apply it
        if ($request->promocode){
            $promocode = Promocode::where('code', $request->promocode)->first();

            if ($promocode){
                $totalPrice = applyPomocode($promocode, $totalPrice);
            }
            $totalPrice = $promocode->apply($totalPrice);

        }

        //add VAT and shipping cost to total price
        $VAT = floatval(Settings::where('name', 'VATPercentage')->first()->value);
        $VATTotal = round($totalPrice * $VAT,2);
        $shippingCost = intval(Settings::where('name', 'shippingCost')->first()->value);
        $totalPrice += $VATTotal + $shippingCost;


        $order = Order::create([
            'type' => $request->isDelivery?'delivery':'pickup',
            'address' => $request->deliveryCity,
            'notes' => $request->notes,
            'phone' => $request->phone,
            'totalPrice' => $totalPrice,

        ]);

        //get cart branch
        $cartBranch = $cart->branch;
        $order->branch()->associate($cartBranch);

        $user = $request->user();
        if ($user){
            $order->user_id = $user->id;
        }



        //add cart products to order
        foreach ($cart->products as $product){
            $order->products()->attach($product->id, ['quantity' => $product->pivot->quantity]);
        }


        $order->save();



        return $order;
    }

    public function updateOrder(Request $request){
        $request->validate([
            'orderId' => ['required', 'integer'],
            'status' => 'required|string|max:255',
        ]);

        $order = Order::find($request->orderId);
        $order->status = $request->status;
        $order->save();
        return $order;
    }
}
