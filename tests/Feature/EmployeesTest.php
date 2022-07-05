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

        $response = $this->post('dashboard/employees',['email' => 'email@adminTest.com']);


        $response->assertStatus(200);
    }

    public function test_manager_can_create_employee_invite()
    {

        $user = User::whereName('manager')->first();

        $this->actingAs($user);

        $response = $this->post('dashboard/employees',['email' => 'email@managerTest.com']);


        $response->assertStatus(200);
    }

    public function test_non_admin_can_not_create_employee_invite()
    {

        $user = User::whereName('employee')->first();

        $this->actingAs($user);

        $response = $this->post('dashboard/employees',['email' => 'email@managerTest.com']);


        $response->assertStatus(403);
    }

    //assign Branch Role To Employee test
    public function test_admin_can_assign_branch_role_to_employee()
    {

        $admin = User::whereName('admin')->first();
        $employee = User::whereName('employee')->first();

        $this->actingAs($admin);

        $response = $this->put('dashboard/employees/assign-branch', ['employee_id' => $employee->id, 'branch_id' => 1]);

        $response->assertStatus(200);
    }
}
