<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutViewController extends Controller
{
    public function index(Request $request){

        return Inertia::render('Checkout/index' );
    }
}
