<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StoreTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_view_store_page()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_view_product_page(){
        $response = $this->get('/products',['product_id' => 1]);

        $response->assertStatus(200);
    }
}
