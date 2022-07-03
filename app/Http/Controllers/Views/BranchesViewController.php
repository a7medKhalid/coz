<?php

namespace App\Http\Controllers\Views;

use App\Actions\AllowedDashboardPages;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ModelsCRUD\BranchController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchesViewController extends Controller
{

    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);
        return Inertia::render('Dashboard/Branches/index',['allowedDashboardPages' => $allowedDashboardPages]);

    }

    public function addBranch(Request $request){
        $branch_controller = new BranchController;

        $branchModel = $branch_controller->create($request);

    }




}
