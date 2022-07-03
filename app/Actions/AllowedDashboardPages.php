<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Http\Request;

class AllowedDashboardPages
{

    public function execute(User $user){

        $userRole = $user->getRoleNames()->first();



        if ($userRole === 'admin'){
            $allowedPages = config('constants.adminDashboardPages');
        }elseif ($userRole === 'manager'){
            $allowedPages = config('constants.managerDashboardPages');
        }elseif ($userRole === 'employee'){
            $allowedPages = config('constants.employeeDashboardPages');
        }elseif ($userRole === 'productManager'){
            $allowedPages = config('constants.productManagerDashboardPages');
        }




        return $allowedPages;
    }

}
