<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::factory()->count(10)->create();

        //attach branch to products
        $products = Product::all();
        $branch = Branch::find(1);


        foreach($products as $product){
            //random integer between 1 and 10
            $random = rand(1, 10);

            $productInventory = $branch->inventory->where('product_id', )->first();

            if($productInventory){
                $productInventory = $branch->updateExistingPivot($product->id,[
                    'quantity' => $random,
                ]);
            }else{
                $productInventory = $branch->inventory()->attach($product->id, ['quantity' => $random]);
            }

        }
    }
}
