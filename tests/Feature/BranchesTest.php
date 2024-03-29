<?php

namespace Tests\Feature;

use App\Actions\GetUserBranchAction;
use App\Models\Branch;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
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

        $branch = Branch::whereName('branch')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches/update', ['branch_id' => $branch->id, 'name' => 'branch edited', 'latitude' => '1', 'longitude' => '1', 'manager_id' => $manager->id]);

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

    public function test_admin_can_update_branch_manager_to_null()
    {

        $user = User::whereName('admin')->first();

        $manager = User::whereName('manager')->first();

        $branch = Branch::whereName('branch edited')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches/update', ['branch_id' => $branch->id, 'name' => 'branch edited', 'latitude' => '1', 'longitude' => '1', 'manager_id' => null]);

        $response->assertStatus(302);

        //check manager does have employee role
        $this->assertTrue($manager->hasRole('employee'));

        //check manager does not have branch role
        $this->assertFalse($manager->hasRole('manager'));

        //check branch does not have manager id
        $branch = $branch->fresh();
        $this->assertNull($branch->manager_id);

        //assign again
        $user = User::whereName('admin')->first();

        $manager = User::whereName('manager')->first();

        $branch = Branch::whereName('branch edited')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches/update', ['branch_id' => $branch->id, 'name' => 'branch edited', 'latitude' => '1', 'longitude' => '1', 'manager_id' => $manager->id]);



    }

    //test branch manager can update inventory
    public function test_branch_manager_can_update_inventory()
    {

        $user = User::whereName('manager')->first();

        $this->actingAs($user);

        $product = Product::first();

        $response = $this->post('dashboard/inventory/update', ['product_id' => $product->id, 'quantity' => '1']);

        $response->assertStatus(302);

//        $getUserBranch = new GetUserBranchAction();
//        $branch = $getUserBranch->execute($user);
//
//        $inventory = $branch->inventory->fresh();
//        dd($inventory, $product->id);
//
//        $inventory = ->where('product_id', $product->id)->first();
//
//
////        //check product quantity
////        $this->assertEquals(1, $inventory->quantity);

    }

    //test view inventroy for branch manager
    public function test_branch_manager_can_view_inventory()
    {

        $user = User::whereName('manager')->first();

        $this->actingAs($user);

        $response = $this->get('dashboard/inventory');

        $response->assertStatus(200);
    }



    public function test_non_admin_can_not_update_branch()
    {

        $user = User::whereName('manager')->first();

        $this->actingAs($user);
        $response = $this->post('dashboard/branches',['branch_id' => 1,'name' => 'branch edited', 'latitude' => '1', 'longitude' => '1']);


        $response->assertStatus(403);
    }

}
