<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmployeesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_admin_can_view_employees_page()
    {

        $user = User::whereName('admin')->first();

        $this->actingAs($user);

        $response = $this->get('dashboard/employees');


        $response->assertStatus(200);

    }

    public function test_manager_can_view_employees_page()
    {

        $user = User::whereName('manager')->first();

        $this->actingAs($user);

        $response = $this->get('dashboard/employees');


        $response->assertStatus(200);
    }

    public function test_admin_can_create_employee_invite()
    {

        $user = User::whereName('admin')->first();

        $this->actingAs($user);

        $response = $this->post('dashboard/employees/invite',['email' => 'email@adminTest.com']);


        $response->assertStatus(302);
    }

    public function test_manager_can_create_employee_invite()
    {

        $user = User::whereName('manager')->first();

        $this->actingAs($user);

        $response = $this->post('dashboard/employees/invite',['email' => 'email@managerTest.com']);


        $response->assertStatus(302);
    }

    public function test_non_admin_can_not_create_employee_invite()
    {

        $user = User::whereName('employee')->first();

        $this->actingAs($user);

        $response = $this->post('dashboard/employees/invite',['email' => 'email@managerTest.com']);

        $response->assertStatus(403);
    }

    //assign Branch Role To Employee test
    public function test_admin_can_assign_branch_role_to_employee()
    {

        $admin = User::whereName('admin')->first();
        $employee = User::whereName('employee')->first();

        $this->actingAs($admin);

        $response = $this->post('dashboard/employees/assign-branch', ['employee_id' => $employee->id, 'branch_id' => 1]);

        $response->assertStatus(302);

        //check if employee has branch role
        $this->assertTrue($employee->hasRole('branchEmployee'));

//        //check if employee has branch id
//        $this->assertEquals($employee->branch_id, 1);

    }

    //assign Product Manager Role To Employee test
    public function test_admin_can_assign_product_manager_role_to_employee()
    {

        $admin = User::whereName('admin')->first();
        $employee = User::whereName('employee')->first();

        $this->actingAs($admin);

        $response = $this->post('dashboard/employees/assign-product-manager', ['employee_id' => $employee->id]);

        $response->assertStatus(302);
    }

    //test manager can assign branch role to employee
    public function test_manager_can_assign_branch_role_to_employee()
    {

        $manager = User::whereName('manager')->first();
        $employee = User::whereName('employee')->first();

        $this->actingAs($manager);

        $response = $this->post('dashboard/employees/assign-branch', ['employee_id' => $employee->id, 'branch_id' => 1]);

        $response->assertStatus(302);
    }

    //test manager can assign product manager role to employee
    public function test_manager_can_assign_product_manager_role_to_employee()
    {

        $manager = User::whereName('manager')->first();
        $employee = User::whereName('employee')->first();

        $this->actingAs($manager);

        $response = $this->post('dashboard/employees/assign-product-manager', ['employee_id' => $employee->id]);

        $response->assertStatus(302);
    }


}
