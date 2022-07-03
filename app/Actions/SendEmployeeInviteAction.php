<?php

namespace App\Actions;

use App\Http\Controllers\ModelsCRUD\InviteController;
use App\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SendEmployeeInviteAction
{

    public function execute(Request $request){


        $invite_controller = new InviteController;

        $inviteModel = $invite_controller->create($request);

        //TODO: send invitation link to email
    }

}
