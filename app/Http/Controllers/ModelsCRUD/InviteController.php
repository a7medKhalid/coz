<?php

namespace App\Http\Controllers\Views;

use App\Http\Controllers\Controller;
use App\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InviteController extends Controller
{
    public function create($email){

        $this->middleware('can:send employee invite');

        //create token
        $token = Str::random(32);

        //create invite model
        $inviteModel = Invite::create([
            'email' => $email,
            'token' => $token
        ]);

        return $inviteModel;
    }
}
