<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $allowedDashboardPages)
    {


        //get all customers
        $customers = User::whereHas('roles', function($query){
            $query->where('name', 'customer');
        })->get();

        $allowedDashboardPages = $allowedDashboardPages->execute($request->user());

        return Inertia::render('Dashboard/Customers/index', ['allowedDashboardPages' => $allowedDashboardPages, 'customers' => $customers]);
    }

}
