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

        $branch = $cart->branch;
        $inventory = $branch?->inventory;

        if ($cart->products->count() == 0){
            return ['cartProducts' => [], 'totalPrice' => 0];
        }

        $cartProducts = $cart->products;


       $totalPrice = $this->getCartTotal($request);

        //get cart products and quantity and return them with total price
        $cartProducts = $cart->products->toQuery()->paginate(100)->through(function ($product) use ($inventory, $cartProducts){

            //if product is in branch inventory then get quantity
            $productInventory = $inventory?->where('id', $product->id)->first();
            $availableQuantity = $productInventory?$productInventory->pivot->quantity:0;

            $cartProduct = $cartProducts->where('id', $product->id)->first();
            $quantity = $cartProduct?$cartProduct->pivot->quantity:0;

            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'isArchived' => $product->isArchived,
                'categories' => $product->categories->pluck('name'),
                'images' => $product->getMedia('product_images')->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'name' => $image->name,
                        'url' => $image->getFullUrl(),
                    ];
                })->toArray(),
                'quantity' => $quantity,

                'availableQuantity' => $availableQuantity,
            ];});


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

            //throw error if product is not available in branch

            return ['error' => 'Not enough quantity'];
        }

        //check if product is already in cart
        $product = $cart->products()->where('product_id', $request->product_id)->first();
        if ($product){
            $product->pivot->quantity += $request->quantity;
            $product->pivot->save();

        }else{
            $cart->products()->attach($request->product_id, ['quantity' => $request->quantity]);
            $cart->save();

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

    public function getCartTotalWithoutVAT(Request $request){
        $cart = $this->getCart($request);
        $totalPrice = 0;
        foreach ($cart->products as $product){
            $totalPrice += $product->pivot->quantity * $product->price;
        }
        return $totalPrice;
    }

    public function getCartTotalWithVAT(Request $request){
        $cart = $this->getCart($request);
        $totalPrice = 0;
        foreach ($cart->products as $product){
            $totalPrice += $product->pivot->quantity * $product->price;
        }
        return $totalPrice;
    }
}
