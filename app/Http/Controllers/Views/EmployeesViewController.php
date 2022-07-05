<?php

namespace App\Http\Controllers\Views;

use App\Actions\AllowedDashboardPages;
use App\Actions\SendEmployeeInviteAction;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class EmployeesViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);

        $employees = User::role('employee')->paginate(15)->through(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'email' => $item->email
            ];});


        return Inertia::render('Dashboard/Employees/index',['employees' => $employees, 'allowedDashboardPages' => $allowedDashboardPages]);

    }

    public function inviteEmployee(Request $request, SendEmployeeInviteAction $sendEmployeeInviteAction){

        $sendEmployeeInviteAction->execute($request);
        return back();
    }

    public function assignBranchRoleToEmployee(Request $request){

        //validate request
        $request->validate([
            'employee_id' => 'required|integer',
            'branch_id' => 'required|integer'
        ]);

        //find employee by id
        $employee = User::find($request->employee_id);

        $permission = Permission::where('model_id', $request['branch_id'])->first();

        //update employee
        $employee
            ->givePermissionTO($permission)
            ->save();



        return back();
    }
}
