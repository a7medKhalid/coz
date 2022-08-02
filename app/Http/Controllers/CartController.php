<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function create(Request $request){
        $cart = Cart::create();

        if ($request->user()){
            $cart->owner_id = $request->user()->id;
        }else{
            $cart->guest_id = $request->session()->getId();
        }

        $cart->branch_id = $request->branch_id??null;

        $cart->save();

        return $cart;
    }

    public function update(Request $request){

        $request->validate([
            'branch_id' => 'required',
        ]);

        $cart = $this->getCart($request);

        //empty cart
        if ($request->branch_id != $cart->branch_id){
            $this->emptyCart($request);
        }

        $cart->branch_id = $request->branch_id;
        $cart->save();

        return $cart;

    }


    public function getCart(Request $request){
        $user = Auth::user();
        if ($user){
            $cart = Cart::where('owner_id', $user->id )->first();
        }else{
            $cart = Cart::where('guest_id' , $request->session()->getId())->first();
        }

        //if cart doesn't exist, create it
        if (!$cart){
            $cart = $this->create($request);
        }

        

        return $cart;
    }

    public function getCartContent(Request $request){
        $cart = $this->getCart($request);

        //get cart products and quantity and return them with total price
        $cartProducts = $cart->products()->get();
        $totalPrice = 0;
        foreach ($cartProducts as $cartProduct){
            $totalPrice += $cartProduct->pivot->quantity * $cartProduct->price;
        }



        return ['cartProducts' => $cartProducts, 'totalPrice' => $totalPrice];
    }

    public function addToCart(Request $request){

        $request->validate([
            'product_id' => 'required',
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $cart = $this->getCart($request);

        //check if product is available in branch
        $branch = $cart->branch;
        if (!$branch){
            return ['error' => 'Choose a branch first'];
        }

        $product = $branch->inventory()->where('id', $request->product_id)->first();

        //check for product quantity
        if ($product->pivot->quantity < $request->quantity){
            return ['error' => 'Not enough quantity'];
        }

        //check if product is already in cart
        $product = $cart->products()->where('product_id', $request->product_id)->first();
        if ($product){
            $product->pivot->quantity += $request->quantity;
            $product->pivot->save();
        }else{
            $cart->products()->attach($request->product_id, ['quantity' => $request->quantity]);
            $cart->save;
        }

        return $cart;
    }

    public function removeFromCart(Request $request){
        $cart = $this->getCart($request);
        $cart->products()->detach($request->product_id);
        return $cart;
    }

    public function emptyCart(Request $request){
        $cart = $this->getCart($request);
        $cart->products()->detach();
        return $cart;
    }
}
