<?php

namespace App\Http\Controllers\ModelsCRUD;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function create(Request $request){
        $request->validate([
            'name' => ['string', 'required'],
            'lat' => ['string', 'required'],
            'lng' => ['string', 'required'],
        ]);


        $this->middleware('can:manage branches');

        $branchModel = Branch::create([
            'name' => $request['name'],
            'lat' => ['string', 'required'],
            'lng' => ['string', 'required'],
        ]);

        return $branchModel;

    }

    public function update(Request $request){
        $request->validate([
            'branch_id' => ['integer', 'required'],
            'name' => ['string', 'required'],
            'lat' => ['string', 'required'],
            'lng' => ['string', 'required'],
            'manager_id' => ['integer', 'nullable'],
        ]);

        $this->middleware('can:manage branches');

        $branchModel = Branch::find($request['branch_id']);

        $branchModel->update([
            'name' => $request['name'],
            'lat' => $request['lat'],
            'lng' => $request['lng']
        ]);

        if ($request->has('manager_id')){
           $manager = User::find($request['manager_id']);

           $branchModel->manager()->save($manager);
        }

        return $branchModel;

    }
}
