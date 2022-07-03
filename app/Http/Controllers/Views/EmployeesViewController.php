<?php

namespace App\Http\Controllers\Views;

use App\Actions\AllowedDashboardPages;
use App\Actions\SendEmployeeInviteAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeesViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);

        return Inertia::render('Dashboard/Employees/index',['allowedDashboardPages' => $allowedDashboardPages]);

    }

    public function inviteEmployee(Request $request, SendEmployeeInviteAction $sendEmployeeInviteAction){

        $sendEmployeeInviteAction->execute($request);

    }
}
