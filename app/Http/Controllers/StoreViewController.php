<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use App\Http\Controllers\ModelsCRUD\BranchController;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StoreViewController extends Controller
{
    public function index(Request $request){

        $productController = new ProductController();
        //if request has category, get products for that category and if it has branch get available products for that branch


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



        if($request->has('category')){
            if ($selectedBranch !== null){
                $products = $productController->getAllProductsByBranch($selectedBranch->id, $request->category);

            }else{

                //if category = all get all products
                if ($request->category == 'all'){
                    $products = $productController->getAllProducts();
                }else{
                    $products = $productController->getAllProductsByCategory($request->category);
                }
            }

        }//homepage
        else{
            if ($selectedBranch !== null){
                $products = $productController->getAllProductsByBranchWithCategory($selectedBranch->id);
            }else{
                $products = $productController->getAllProductsWithCategory();
            }
        }


        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();



        return Inertia::render('index',['products' => $products, 'categories' => $categories, 'branches' => $branches ,'selectedBranch' => $selectedBranch ] );
    }

}
