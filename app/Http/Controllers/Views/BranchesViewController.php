<?php

namespace App\Http\Controllers\Views;

use App\Actions\AllowedDashboardPages;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ModelsCRUD\BranchController;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchesViewController extends Controller
{

    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);

        $employees = User::role('employee')->get();

        $branches = Branch::all();

        return Inertia::render('Dashboard/Branches/index',['employees' => $employees, 'branches' => $branches, 'allowedDashboardPages' => $allowedDashboardPages]);

    }

    public function addBranch(Request $request){
        $branch_controller = new BranchController;

        $branchModel = $branch_controller->create($request);

        return back();

    }

    public function updateBranch(Request $request){

        $branch_controller = new BranchController;

        dump("Display this on the screen");



        $branchModel = $branch_controller->update($request);

        return back();
    }




}
