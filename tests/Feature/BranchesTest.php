<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class BranchesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_view_forManageBranchesPermission()
    {
        $this->seed();

        $user = User::whereName('Admin')->first();

        $this->actingAs($user);
        $response = $this->get('dashboard/branches');


        $response->assertStatus(200);
    }

    public function test_can_not_view_forManageBranchesPermission()
    {

        $user = User::whereName('Customer')->first();

        $this->actingAs($user);
        $response = $this->get('dashboard/branches');


        $response->assertStatus(403);
    }

}
