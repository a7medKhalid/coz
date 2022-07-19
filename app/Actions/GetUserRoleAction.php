<?php

namespace App\Actions;

use App\Models\User;

class GetUserRoleAction
{
    public function execute(User $user)
    {
        //check if user is admin or manager
        $isAdmin = $user->hasRole('admin');
        $isManager = $user->hasRole('branchManager');
        $isProductManager = $user->hasRole('productManager');
        $isEmployee = $user->hasRole('employee');

        if ($isAdmin){
            $authType = 'admin';
        }elseif ($isManager) {
            $authType = 'branchManager';
        }elseif ($isProductManager) {
            $authType = 'productManager';
        }elseif ($isEmployee){
            $authType = 'employee';
        }else{
           $authType = 'customer';
        }

        return $authType;
    }

}
