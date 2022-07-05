<?php

namespace App\Actions;

use App\Models\Invite;

class CheckEmployeeTokenAction
{
    public function execute($email, $token){

        //retrieve invite model
        $inviteModel = Invite::whereEmail($email, $token)->first();

        //check if invite is valid
        $isValid = 0;

        if($inviteModel){

            if ($inviteModel->isValid){
                $isValid = 1;
            }

            //unvalid invite
            $inviteModel->isValid = 0;
            $inviteModel->save();
        }


        //return status
        return $isValid;
    }
}
