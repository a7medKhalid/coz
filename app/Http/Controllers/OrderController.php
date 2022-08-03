<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Zorb\Promocodes\Models\Promocode;

class OrderController extends Controller
{
    public function createOrder(Request $request){

        $request->validate([
            'isDelivery' => ['required', 'boolean'],
            'deliveryCity' => 'required_if:isDelivery,true',
            'promocode' => ['nullable', 'string', 'max:255','exists:promocodes,code' ],
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


        $order = $cart->orders()->create([
            'status' => $request->isDelivery?'delivery':'pickup',
            'address' => $request->deliveryCity,
            'notes' => $request->notes,
            'phone' => $request->phone,
            'totalPrice' => $totalPrice,

        ]);

        $user = $request->user();
        if ($user){
            $order->user_id = $user->id;
            $order->save();
        }

        //add cart products to order
        foreach ($cart->products as $product){
            $order->products()->attach($product->id, ['quantity' => $product->pivot->quantity]);
        }



        return $order;
    }
}
