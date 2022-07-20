<?php

namespace App\Http\Controllers;

use App\Actions\GetUserBranchAction;
use App\Models\Branch;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function getProductById(Request $request)
    {
        $product = Product::find($request->product_id);
        return $product;
    }

    public function getImages(Request $request)
    {
        $product = Product::find($request->product_id);
        return $product->getMedia('product_images');
    }


    public function createProduct(Request $request){

        //validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'categories' => 'nullable|array',
        ]);

       $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

       if ($request['categories'] !== null) {
           $product->categories()->sync($request->categories);
       }

        return $product;
    }

    public function updateProduct(Request $request){

        //validate the request
        $request->validate([
            'product_id' => 'required|numeric',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'archived' => 'nullable|boolean',
            'categories' => 'nullable|array',
        ]);

        $product = Product::find($request->product_id);

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->isArchived = $request->archived??false;

        $categories = $request->categories;

        $product->categories()->sync($categories);

        $product->save();

        return $product;
    }

    public function deleteProduct(Request $request){

        //validate the request
        $request->validate([
            'product_id' => 'required|numeric',
        ]);

        $product = Product::find($request->product_id);

        $product->delete();

    }

    public function getAllProducts($user){
        $products = Product::latest()->paginate(15)->through(function ($product) {


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
            ];});

        return $products;

    }




    public function getAllActiveProductsWithQuantity($user){

        $getUserBranch = new GetUserBranchAction;
        $branch = $getUserBranch->execute($user);
        $inventory = $branch->inventroy;

        $products = Product::latest()->paginate(15)->through(function ($product) use ($inventory) {
            $productInventory = $inventory?->where('id', $product->id)->first();
            $quantity = $productInventory?$productInventory->pivot->quantity:0;
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

        return $products;
    }

    public function getAllProductsByBranch($branchId, $categoryName = null){
        $branch = Branch::find($branchId);

        $products = $branch->products;

        if($categoryName){
            $products = $products->whereHas('categories', function($query) use ($categoryName){
                $query->where('name', $categoryName);
            });
        }

        return $products;
    }


    public function getAllProductsByCategory($categoryName){

        $category = Category::whereName($categoryName)->first();

        $products = $category->products->latest()->paginate(15)->through(function ($product) use ($category) {
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
            ];});

        return $products;
    }


}
