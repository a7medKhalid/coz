<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use App\Http\Controllers\ModelsCRUD\BranchController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreViewController extends Controller
{
    public function index(Request $request){

        $productController = new ProductController();
        //if request has category, get products for that category and if it has branch get available products for that branch


        if($request->has('category') or $request->has('branch')){
            if ($request->has('branch')){
                $products = $productController->getAllProductsByBranch($request->branch, $request->category);
            }else{
                $products = $productController->getAllProductsByCategory($request->category);
            }
        }else{
            $products = $productController->getAllProducts();
        }


        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        return Inertia::render('index',['products' => $products, 'categories' => $categories, 'branches' => $branches] );
    }

}
