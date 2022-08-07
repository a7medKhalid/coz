<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use Illuminate\Http\Request;

class CategoriesViewController extends Controller
{
    public function index(Request $request){

        $categoryController = new CategoryController;

        $categories = $categoryController->getAllCategories($request);

        $allowedDashboardPagesService = new AllowedDashboardPages;
        $allowedDashboardPages = $allowedDashboardPagesService->execute($request->user());
        return inertia('Dashboard/Categories/index', [
            'categories' => $categories,
            'allowedDashboardPages' => $allowedDashboardPages,
        ]);
    }


    public function createCategory(Request $request){
        $categoryController = new CategoryController;
        $category = $categoryController->createCategory($request);
        return back();
    }

    public function updateCategory(Request $request){
        $categoryController = new CategoryController;
        $category = $categoryController->updateCategory($request);
        return back();
    }

    public function deleteCategory(Request $request){
        $categoryController = new CategoryController;
        $category = $categoryController->deleteCategory($request);
        return back();
    }


}
