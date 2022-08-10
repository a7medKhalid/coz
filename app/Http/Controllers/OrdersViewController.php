<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrdersViewController extends Controller
{

    public function index(Request $request)
    {

        $orderController = new OrderController();
        $orders = $orderController->getAllOrders();



        $allowedDashboardPagesService = new AllowedDashboardPages();
        $allowedDashboardPages = $allowedDashboardPagesService->execute($request->user());


        return Inertia::render('Dashboard/Orders/index',[
            'orders' => $orders,
            'allowedDashboardPages' => $allowedDashboardPages
        ]);
    }

    public function viewOrder(Request $request, $id){
        $orderController = new OrderController();
        $order = $orderController->getOrder($id);

        $orderProducts = $order->products;

        $products = $order->products->toQuery()->paginate(100)->through(function ($product) use ($orderProducts) {

            //if product is in branch inventory then get quantity

            $orderProduct = $orderProducts->where('id', $product->id)->first();
            $quantity = $orderProduct?$orderProduct->pivot->quantity:0;

            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'isArchived' => $product->isArchived,
                'categories' => $product->categories->pluck('name'),
                'images' => $product->getMedia('product_images')->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'name' => $image->name,
                        'url' => $image->getFullUrl(),
                    ];
                })->toArray(),
                'quantity' => $quantity,
            ];});

        $allowedDashboardPagesService = new AllowedDashboardPages();
        $allowedDashboardPages = $allowedDashboardPagesService->execute($request->user());

        return Inertia::render('Dashboard/Orders/view',[
            'order' => $order,
            'products' => $products,
            'allowedDashboardPages' => $allowedDashboardPages
        ]);
    }

    public function updateOrder(Request $request){
        $orderController = new OrderController();
        $order = $orderController->updateOrder($request);
        return redirect()->route('dashboard.orders.view', $order->id);
    }
}
