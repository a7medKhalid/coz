<?php

namespace App\Http\Controllers;

use App\Actions\GetCustomerSelectedBranch;
use App\Http\Controllers\ModelsCRUD\BranchController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartViewController extends Controller
{
    public function index(Request $request){

        $cartController = new CartController();
        $cart = $cartController->getCartContent($request);


        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);


        return Inertia::render('Cart/index',['cart' => $cart, 'categories' => $categories, 'branches' => $branches ,'selectedBranch' => $selectedBranch ] );
    }

    public function addToCart(Request $request){
        $cartController = new CartController();
        $cart = $cartController->addToCart($request);

        return back();
    }

    public function updateBranch(Request $request){
        $cartController = new CartController();
        $cart = $cartController->update($request);

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
