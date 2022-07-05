<?php

namespace App\Http\Controllers\ModelsCRUD;

use App\Http\Controllers\Controller;
use App\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class InviteController extends Controller
{
    public function create(Request $request){

        $request->validate(['email' => ['email', 'required']]);

        $email = $request['email'];

        $this->middleware('can:send employee invite');

        //create token
        $token = Str::random(32);

        //create invite model
        $inviteModel = Invite::updateOrCreate([
            'email' => $email,
            'token' => $token
        ]);

        return $inviteModel;
    }
}
