<?php

namespace Tests\Feature;

use App\Models\Branch;
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

        $user = User::whereName('admin')->first();

        $this->actingAs($user);
        $response = $this->get('dashboard/branches');


        $response->assertStatus(200);
    }

    public function test_can_not_view_forManageBranchesPermission()
    {

        $user = User::whereName('customer')->first();

        $this->actingAs($user);
        $response = $this->get('dashboard/branches');


        $response->assertStatus(403);
    }


    public function test_admin_can_create_branch()
    {

        $user = User::whereName('admin')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches',['name' => 'branch', 'latitude' => '1', 'longitude' => '1']);


        $response->assertStatus(302);
    }

    public function test_non_admin_can_not_create_branch()
    {

        $user = User::whereName('manager')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches',['name' => 'branch', 'latitude' => '1', 'longitude' => '1']);


        $response->assertStatus(403);
    }

    public function test_admin_can_update_branch()
    {

        $user = User::whereName('admin')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches',['branch_id' => 1,'name' => 'branch edited',  'latitude' => '1', 'longitude' => '1']);


        $response->assertStatus(302);

    }

    //test admin can update branch manager
    public function test_admin_can_update_branch_manager()
    {

        $user = User::whereName('admin')->first();

        $manager = User::whereName('manager')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches/update', ['branch_id' => 1, 'name' => 'branch edited', 'latitude' => '1', 'longitude' => '1', 'manager_id' => $manager->id]);

        $response->assertStatus(302);

//        //check manager does not have employee role
//        $this->assertFalse($manager->hasRole('employee'));

        //check manager has branch role
//
//
//        $this->assertTrue($manager->hasRole('manager'));
//
//        //check branch has manager id
//        $this->assertEquals($manager->id, Branch::find(1)->manager_id);
    }



    public function test_non_admin_can_not_update_branch()
    {

        $user = User::whereName('manager')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches',['branch_id' => 1,'name' => 'branch edited', 'latitude' => '1', 'longitude' => '1']);


        $response->assertStatus(403);
    }

}
