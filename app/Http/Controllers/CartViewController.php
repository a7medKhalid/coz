<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartViewController extends Controller
{
    public function index(Request $request){

        $cartController = new CartController();
        $cart = $cartController->getCart($request);

        return Inertia::render('index',$cart );
    }

    public function addToCart(Request $request){
        $cartController = new CartController();
        $cart = $cartController->addToCart($request);

        return back();
    }

    public function removeFromCart(Request $request){
        $cartController = new CartController();
        $cart = $cartController->removeFromCart($request);

        return back();
    }

    public function emptyCart(Request $request){
        $cartController = new CartController();
        $cart = $cartController->emptyCart($request);

        return back();
    }





}