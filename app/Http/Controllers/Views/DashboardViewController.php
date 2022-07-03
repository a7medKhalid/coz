<?php

namespace App\Http\Controllers\Views;

use App\Actions\AllowedDashboardPages;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $AllowedDashboardPagesService){

        $user = $request->user();
        $allowedDashboardPages = $AllowedDashboardPagesService->execute($user);
        return Inertia::render('Dashboard',['allowedDashboardPages' => $allowedDashboardPages]);
    }
}
