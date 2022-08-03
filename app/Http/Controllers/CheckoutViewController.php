<?php

namespace App\Http\Controllers;

use App\Actions\GetCustomerSelectedBranch;
use App\Http\Controllers\ModelsCRUD\BranchController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutViewController extends Controller
{
    public function index(Request $request){
        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);


        return Inertia::render('Checkout/index',['categories' => $categories, 'branches' => $branches ,'selectedBranch' => $selectedBranch ] );
    }

    public function invoice(Request $request){
        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);


        return Inertia::render('Invoice/index',['categories' => $categories, 'branches' => $branches ,'selectedBranch' => $selectedBranch ] );
    }
}
