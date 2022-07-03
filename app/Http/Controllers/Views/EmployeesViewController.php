<?php

namespace App\Http\Controllers\Views;

use App\Actions\AllowedDashboardPages;
use App\Actions\SendEmployeeInviteAction;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeesViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);

        $employees = User::role('employee')->get();

        return Inertia::render('Dashboard/Employees/index',['employees' => $employees, 'allowedDashboardPages' => $allowedDashboardPages]);

    }

    public function inviteEmployee(Request $request, SendEmployeeInviteAction $sendEmployeeInviteAction){

        $sendEmployeeInviteAction->execute($request);

    }
}
