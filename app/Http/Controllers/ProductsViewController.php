<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductsViewController extends Controller
{

    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);

        $productController = new ProductController;
        $products = $productController->getAllProducts();

        $categoryController = new CategoryController;
        $categories = $categoryController->getAllCategories($request);

        return Inertia::render('Dashboard/Products/index',['allowedDashboardPages' => $allowedDashboardPages, 'products' => $products, 'categories' => $categories] );
    }

    public function createProduct(Request $request){
        $productController = new ProductController;
        $product = $productController->createProduct($request);
        return back();
    }

    public function updateProduct(Request $request){
        $productController = new ProductController;
        $product = $productController->updateProduct($request);
        return back();
    }

    public function deleteProduct(Request $request){
        $productController = new ProductController;
        $productController->deleteProduct($request);
        return back();
    }

    public function getProductImages(Request $request){
        $productController = new ProductController;
        $productImages = $productController->getImages($request);
        return $productImages;
    }

    public function addProductImage(Request $request){

        Validator::make($request->all(), [
            'image' => ['mimes:jpeg,jpg,png','required','max:10000'],
            'product_id' => ['required','integer'],
        ])->validate();


        $file = $request->file('image');

        $productController = new ProductController;
        $product = $productController->getProductById($request);

        $product->addMedia($file)->toMediaCollection('product_images');

        return back();
    }

    public function deleteProductImage(Request $request){

        $productController = new ProductController;
        $product = $productController->getProductById($request);

        $product->deleteMedia($request->image_id);

        return back();
    }

    public function getCategories(Request $request){

        $categoryController = new CategoryController;

        $categories = $categoryController->getAllCategories($request);

        return inertia('Dashboard/Products/index', [
            'categories' => $categories,
        ]);
    }

    public function addCategory(Request $request){
        return back();
    }

    public function createCategory(Request $request){
        $categoryController = new CategoryController;
        $category = $categoryController->createCategory($request);
        return back();
    }

    public function deleteCategory(Request $request){
        $categoryController = new CategoryController;
        $category = $categoryController->deleteCategory($request);
        return back();
    }







}
