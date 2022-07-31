<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CartTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */



    public function test_create_cart()
    {

        $customer = User::whereName('customer')->first();

        $this->actingAs($customer);

        $response = $this->get('cart');

        $response->assertStatus(200);

        $this->assertDatabaseHas('carts', [
            'owner_id' => $customer->id,
        ]);

    }

    public function test_update_cart_branch(){
        $customer = User::whereName('customer')->first();

        $this->actingAs($customer);


        $response = $this->post('cart/update', [
            'branch_id' => 3,
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('carts', [
            'owner_id' => $customer->id,
            'branch_id' => 3,
        ]);
    }

    public function test_add_product_to_cart()
    {

        $customer = User::whereName('customer')->first();



        $this->actingAs($customer);

        $response = $this->post('cart/add', [
            'product_id' => 11,
            'quantity' => 1,
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('cart_has_products', [
            'product_id' => 11,
        ]);

    }

    public function test_view_cart()
    {
        $user = User::whereName('customer')->first();
        $this->actingAs($user);
        $response = $this->get('/cart');
        $response->assertStatus(200);
    }


    public function test_remove_product_from_cart()
    {

        $customer = User::whereName('customer')->first();
        $this->actingAs($customer);

        $response = $this->post('cart/remove', [
            'product_id' => 11,
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseMissing('cart_has_products', [
            'product_id' => 11,
        ]);
    }


}
