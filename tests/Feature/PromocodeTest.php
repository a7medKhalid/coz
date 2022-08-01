<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Zorb\Promocodes\Models\Promocode;

class PromocodeTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    //test viewing promocodes page
    public function testViewPromocodesPage()
    {
        $admin = \App\Models\User::whereName('admin')->first();

        $response = $this->actingAs($admin);

        $response = $this->get('dashboard/promocodes');
        $response->assertStatus(200);
    }

    //test creating promocode
    public function testCreatePromocode()
    {
        $admin = \App\Models\User::whereName('admin')->first();

        $response = $this->actingAs($admin);

        $response = $this->post('dashboard/promocodes', [
            'code' => 'test',
            'discount' => 30,
            'expired_at' => '2020-01-01',
            'usages_left' => 3,
            'multi_use' => 1,
        ]);
        $response->assertStatus(302);

        $this->assertDatabaseHas('promocodes', [
            'code' => 'test',

        ]);
    }

    //test editing promocode
    public function testEditPromocode()
    {
        $admin = \App\Models\User::whereName('admin')->first();

        $response = $this->actingAs($admin);

        $response = $this->post('dashboard/promocodes/update', [
            'promocode_id' => Promocode::first()->id,
            'discount' => 50,
            'expired_at' => '2020-01-01',
            'usages_left' => 5,
            'multi_use' => 0,
        ]);
        $response->assertStatus(302);

        $this->assertDatabaseHas('promocodes', [
            'usages_left' => 5,
            'multi_use' => 0,
            'expired_at' => '2020-01-01',
           ]);
    }

    //test deleting promocode
    public function testDeletePromocode()
    {
        $admin = \App\Models\User::whereName('admin')->first();

        $response = $this->actingAs($admin);

        $response = $this->post('dashboard/promocodes/delete', [
            'promocode_id' => Promocode::first()->id,
        ]);
        $response->assertStatus(302);

        $this->assertDatabaseMissing('promocodes', [
            'code' => 'testEdit',

        ]);
    }




}
