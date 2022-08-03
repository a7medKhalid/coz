<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SettingsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_settings_can_be_viewed(){

        //run settings seeder
        $admin = User::whereName('admin')->first();

        $this->actingAs($admin)
            ->get('dashboard/settings')
            ->assertStatus(200);
    }

    public function test_settings_can_be_updated()
    {
        $admin = User::whereName('admin')->first();

        $this->actingAs($admin)
            ->post('dashboard/settings', [
                'siteName' => 'Test Site Name',
                'siteDescription' => 'Test Site Description',
                'siteEmail' => 'email@test.com',
                'sitePhone' => '123-456-7890',
                'siteTwitter' => '@test',
                'siteInstagram' => 'test',
                'shippingCost' => '$10',
                'shippingTime' => '1 day',
                'shippingCities' => ['San Francisco', 'New York', 'Los Angeles'],
            ])->assertStatus(302);



        $this->assertDatabaseHas('settings', ['name' => 'siteName', 'value' => 'Test Site Name']);
        $this->assertDatabaseHas('settings', ['name' => 'siteDescription', 'value' => 'Test Site Description']);
        $this->assertDatabaseHas('settings', ['name' => 'siteEmail', 'value' => 'email@test.com']);
        $this->assertDatabaseHas('settings', ['name' => 'sitePhone', 'value' => '123-456-7890']);
        $this->assertDatabaseHas('settings', ['name' => 'siteTwitter', 'value' => '@test']);
        $this->assertDatabaseHas('settings', ['name' => 'siteInstagram', 'value' => 'test']);
        $this->assertDatabaseHas('settings', ['name' => 'shippingCost', 'value' => '$10']);
        $this->assertDatabaseHas('settings', ['name' => 'shippingTime', 'value' => '1 day']);
        $this->assertDatabaseHas('settings', ['name' => 'shippingCities', 'value' => 'San Francisco,New York,Los Angeles']);

    }
}
