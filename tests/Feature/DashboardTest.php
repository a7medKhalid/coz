<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_view_forManageDashboardPermission()
    {

        $user = User::whereName('admin')->first();

        $this->actingAs($user);
        $response = $this->get('dashboard/branches');


        $response->assertStatus(200);
    }

    public function test_can_not_view_forManageDashboardPermission()
    {

        $user = User::whereName('customer')->first();

        $this->actingAs($user);
        $response = $this->get('dashboard');


        $response->assertStatus(403);
    }
}
