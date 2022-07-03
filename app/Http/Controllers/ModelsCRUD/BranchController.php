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

    public function update(Request $request){
        $request->validate([
            'branch_id' => ['integer', 'required'],
            'name' => ['string', 'required'],
            'coordinates' => ['string', 'required'],
            'manager_id' => ['integer', 'nullable'],
        ]);

        $this->middleware('can:manage branches');

        $branchModel = Branch::find($request['branch_id']);

        $branchModel->update([
            'name' => $request['name'],
            'coordinates' => $request['coordinates']
        ]);

        if ($request->has('manager_id')){
           $manager = User::find($request['manager_id']);

           $branchModel->manager()->save($manager);
        }

        return $branchModel;

    }
}
