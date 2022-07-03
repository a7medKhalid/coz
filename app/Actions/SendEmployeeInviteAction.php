<?php

namespace App\Actions;

use App\Http\Controllers\Views\InviteController;
use App\Models\Invite;
use Illuminate\Support\Str;

class SendEmployeeInviteAction
{

    public function execute($email){


        $invite_controller = new InviteController;

        $inviteModel = $invite_controller->create($email);

        //TODO: send invitation link to email
    }

}
