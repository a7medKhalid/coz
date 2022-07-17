<?php

namespace App\Actions;

class RemoveAllUserRolesAction
{

    public function execute($user)
    {
        $user->removeAllRoles();
    }

}
