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
        return $categories;
    }

    public function createCategory(Request $request){
        $category = Category::create([
            'name' => $request->name,
        ]);
        return $category;
    }

    public function deleteCategory(Request $request){
        $category = Category::find($request->category_id);
        $category->delete();
        return $category;
    }
}
