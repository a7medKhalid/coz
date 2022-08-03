<?php

namespace App\Actions;

use App\Models\Cart;
use Illuminate\Http\Request;

class GetCustomerSelectedBranch
{

    public function execute(Request $request)
    {
        //check if user is logged in
        if ($request->user()){
            //get user cart
            $cart = $request->user()->cart;
            //get user cart branch
            if ($cart){
                $selectedBranch = $cart->branch;
            }else{
                $selectedBranch = null;
            }
        }else{
            $cart = Cart::where('guest_id' , $request->session()->getId())->first();

            if ($cart){
                $selectedBranch = $cart->branch;
            }else{
                $selectedBranch = null;
            }
        }

        return $selectedBranch;

    }
}
