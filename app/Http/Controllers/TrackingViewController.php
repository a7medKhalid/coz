<?php

namespace App\Http\Controllers;

use App\Actions\GetCustomerSelectedBranch;
use App\Http\Controllers\ModelsCRUD\BranchController;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class TrackingViewController extends Controller
{
    public function index(Request $request, $id){




        $order = Order::find($id);


        $orderId = $order->id;
        $orderStatus = $order->status;
        $orderTotal = $order->totalPrice;
        $orderType = $order->type;
        $orderBranch = $order->branch->name;


        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategoriesNames($request);

        $branchesController = new BranchController;
        $branches = $branchesController->getAllBranches();

        $getCustomerSelectedBranch = new GetCustomerSelectedBranch();
        $selectedBranch = $getCustomerSelectedBranch->execute($request);


        return Inertia::render('Tracking/index',['categories' => $categories,
            'branches' => $branches ,
            'selectedBranch' => $selectedBranch,
            'orderId' => $orderId,
            'orderStatus' => $orderStatus,
            'orderTotal' => $orderTotal,
            'orderType' => $orderType,
            'orderBranchName' => $orderBranch,
            'orderBranchLatitude' => $order->branch->latitude,
            'orderBranchLongitude' => $order->branch->longitude,
        ] );
    }
}
