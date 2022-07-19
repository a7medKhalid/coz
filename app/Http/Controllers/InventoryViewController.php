<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use App\Http\Controllers\ModelsCRUD\BranchController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InventoryViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $allowedDashboardPages)
    {
        //get active products
        $productController = new ProductController();
        $products = $productController->getAllActiveProductsWithQuantity(Auth::user());
        $allowedDashboardPages = $allowedDashboardPages->execute($request->user());

        return Inertia::render('Dashboard/Products/index',['allowedDashboardPages' => $allowedDashboardPages, 'products' => $products] );
    }

    public function updateBranchInventory(Request $request){
        $branchController = new BranchController();
        $branchController->updateInventory($request);

        return back();
    }
}
