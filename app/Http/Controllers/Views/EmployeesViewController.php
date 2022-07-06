<?php

namespace App\Http\Controllers\Views;

use App\Actions\AllowedDashboardPages;
use App\Actions\GetUserRoleAction;
use App\Actions\SendEmployeeInviteAction;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ModelsCRUD\BranchController;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class EmployeesViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);

        $employees = User::role('employee')->paginate(15)->through(function ($user) {


            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'branch' => $user->branch?->name,
            ];});

        $branch_controller = new BranchController;

        $branches = $branch_controller->read($request);

        $GetUserRoleAction = new GetUserRoleAction;

        $authType = $GetUserRoleAction->execute($user);


        return Inertia::render('Dashboard/Employees/index',['employees' => $employees, 'allowedDashboardPages' => $allowedDashboardPages, 'branches' => $branches, 'authType' => $authType]);

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

        //find branch by id
        $branch = Branch::find($request->branch_id);


        //assign manage branch role to employee
        $employee->assignRole('branchEmployee');

        //assign branch id to employee
        $employee->branch()->associate($branch);

        $employee->save();


        return back();
    }

    public function assignProductManagerRoleToEmployee(Request $request)
    {

        //validate request
        $request->validate([
            'employee_id' => 'required|integer'
        ]);

        //find employee by id
        $employee = User::find($request->employee_id);


        //update employee
        $employee
            ->assignRole('productManager')
            ->save();

        return back();
    }
}
