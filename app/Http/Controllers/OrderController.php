<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Zorb\Promocodes\Models\Promocode;

class OrderController extends Controller
{
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
            $totalPrice = $promocode->apply($totalPrice);
        }


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
}
