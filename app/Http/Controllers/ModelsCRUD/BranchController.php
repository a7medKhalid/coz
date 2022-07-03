<?php

namespace App\Http\Controllers\ModelsCRUD;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function create(Request $request){
        $request->validate([
            'name' => ['string', 'required'],
            'coordinates' => ['string', 'required']
        ]);


        $this->middleware('can:manage branches');

        $branchModel = Branch::create([
            'name' => $request['name'],
            'coordinates' => $request['coordinates']
        ]);

        return $branchModel;

    }
}
