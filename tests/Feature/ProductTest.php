<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
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


    //add product image
    public function test_add_product_image()
    {
        $user = User::whereName('productManager')->first();

        $product = Product::whereName('product')->first();

        $image = UploadedFile::fake()->image('product.jpg');

        $this->actingAs($user);
        $response = $this->post('dashboard/products/image', ['product_id' => $product->id, 'image' => $image]);

        $response->assertStatus(302);

        //assert image exist in database
        $this->assertDatabaseHas('media', ['file_name' => 'product.jpg' ,'model_id' => $product->id]);

    }

    //test get product images

    public function test_get_product_images(){
        $user = User::whereName('productManager')->first();

        $product = Product::whereName('product')->first();

        $this->actingAs($user);
        $response = $this->call('GET', 'dashboard/products/image/', ['product_id' => $product->id]);

        $response->assertStatus(200);

    }

    //test delete product image
    public function test_delete_product_image(){
        $user = User::whereName('productManager')->first();

        $product = Product::whereName('product')->first();

        $image = Media::whereFileName('product.jpg')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/products/image/delete', ['product_id' => $product->id, 'image_id' => $image->id]);

        $response->assertStatus(302);

        //assert image exist in database
        $this->assertDatabaseMissing('media', ['file_name' => 'product.jpg' ,'model_id' => $product->id]);

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
