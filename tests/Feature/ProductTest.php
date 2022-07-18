<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    //test create product
    public function test_create_product()
    {
        $user = User::whereName('productManager')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/products',['name' => 'product', 'price' => '1', 'description' => '1']);

        //assert product exist in database
        $this->assertDatabaseHas('products', ['name' => 'product']);

        $response->assertStatus(302);
    }

    //test update product with product manager
    public function test_update_product_with_product_manager()
    {
        $user = User::whereName('productManager')->first();

        $category = Category::create(['name' => 'category']);

        $product = Product::whereName('product')->first();
        $this->actingAs($user);
        $response = $this->post('dashboard/products/update',['product_id' => $product->id, 'name' => 'product', 'price' => '5', 'description' => '1', 'categories' => [$category->id]]);


        $response->assertStatus(302);

        //assert product exist in database with price 5
        $this->assertDatabaseHas('products', ['name' => 'product', 'price' => '5']);

    }

    //test delete product with product manager
    public function test_delete_product_with_product_manager()
    {
        $user = User::whereName('productManager')->first();

        $product = Product::whereName('product')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/products/delete',['product_id' => $product->id]);


        $response->assertStatus(302);

        //assert product exist in database
        $this->assertDatabaseMissing('products', ['name' => 'product']);

    }

}
