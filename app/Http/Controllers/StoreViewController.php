<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use App\Actions\GetCustomerSelectedBranch;
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


        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);



        if($request->has('category')){
            if ($selectedBranch !== null){
                $products = $productController->getAllProductsByBranch($selectedBranch->id, $request->category);
                $s = [];
                $products = array_push($s, ['products' => $products]);
                $products = $s;


            }else{

                //if category = all get all products
                if ($request->category == 'all'){
                    $products = $productController->getAllProducts();
                    $s = [];
                    $products = array_push($s, ['products' => $products]);
                    $products = $s;
                }else{
                    $products = $productController->getAllProductsByCategory($request->category);
                    $s = [];
                    $products = array_push($s, ['products' => $products]);
                    $products = $s;
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

    public function viewProduct(Request $request){

        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);

        $productController = new ProductController();
        if ($selectedBranch !== null){
            $product = $productController->getProductByIdAndBranch($request->product_id, $selectedBranch);

        }else{
            $product = $productController->getProductById($request);
        }



        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);


        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        return Inertia::render('Store/Product/index',['product' => $product, 'categories' => $categories, 'branches' => $branches ,'selectedBranch' => $selectedBranch]);
    }

}
