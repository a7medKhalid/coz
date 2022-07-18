<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryTest extends TestCase
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

    //test create category

    public function test_create_category()
    {
        $user = User::whereName('productManager')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/categories',['name' => 'category']);

        //assert category exist in database
        $this->assertDatabaseHas('categories', ['name' => 'category']);

        $response->assertStatus(302);
    }

    //test delete category with product manager

    public function test_delete_category_with_product_manager()
    {
        $user = User::whereName('productManager')->first();

        $category = Category::create(['name' => 'categoryTobeDeleted']);

        $this->actingAs($user);
        $response = $this->post('dashboard/categories/delete',['category_id' => $category->id]);

        $response->assertStatus(302);

        //assert category exist in database
        $this->assertDatabaseMissing('categories', ['name' => 'categoryTobeDeleted']);

    }

    //test get all categories with product manager
    public function test_get_all_categories_with_product_manager()
    {
        $user = User::whereName('productManager')->first();

        $this->actingAs($user);
        $response = $this->get('dashboard/categories');

        $response->assertStatus(200);
    }
}
