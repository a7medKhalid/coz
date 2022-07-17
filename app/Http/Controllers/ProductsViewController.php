<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsViewController extends Controller
{

    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);
        return Inertia::render('Dashboard/Products/index',['allowedDashboardPages' => $allowedDashboardPages] );
    }

    public function createProduct(Request $request){
        return back();
    }

    public function updateProduct(Request $request){
        return back();
    }

    public function deleteProduct(Request $request){
        return back();
    }

    public function addProductImage(Request $request){
        return back();
    }

    public function deleteProductImage(Request $request){
        return back();
    }

    public function getCategorys(Request $request){
        return back();
    }

    public function addCategory(Request $request){
        return back();
    }

    public function createCategory(Request $request){
        return back();
    }





}
