<?php

namespace App\Actions;

use App\Models\User;

class AllowedDashboardPages
{

    public function execute(User $user){

        $userRole = $user->getRoleNames()->first();



        if ($user->hasRole('admin') ){
            $allowedPages = config('constants.adminDashboardPages');
        }elseif ($user->hasRole('branchManager')){
            $allowedPages = config('constants.managerDashboardPages');
        }elseif ($user->hasRole('productManager')){
            $allowedPages = config('constants.productManagerDashboardPages');
        }elseif ($user->hasRole('branchEmployee')){
            $allowedPages = config('constants.branchEmployeeDashboardPages');
        }elseif ($user->hasRole( 'employee')){
            $allowedPages = config('constants.employeeDashboardPages');
        }




        return $allowedPages;
    }

}
