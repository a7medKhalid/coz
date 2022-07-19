<?php

namespace App\Actions;

use App\Models\Branch;
use App\Models\User;

class GetUserBranchAction
{

    public function execute(User $user)
    {
        if ($user->hasRole('branchManager')) {
            return Branch::where('user_id', $user->id)->first();
        } elseif ($user->hasRole('branchEmployee')) {
            return $user->branch;
        }else{
            return null;
        }
    }

}
