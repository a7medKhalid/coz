<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getAllCategories(Request $request){
        $categories = Category::all();
        return $categories;
    }

    public function getAllCategoriesNames(Request $request){
        $categories = Category::all()->pluck('name');
        //add all categories to the collection beginning
        $categories->prepend('all');

        return $categories;
    }

    public function createCategory(Request $request){
        $category = Category::create([
            'name' => $request->name,
        ]);
        return $category;
    }

    public function updateCategory(Request $request){
        $category = Category::find($request->id);
        $category->name = $request->name;
        $category->save();
        return $category;
    }

    public function deleteCategory(Request $request){
        $category = Category::find($request->category_id);
        $category->delete();
        return $category;
    }
}
