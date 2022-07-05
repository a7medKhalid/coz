<?php

namespace App\Http\Controllers\ModelsCRUD;

use App\Actions\GetUserRoleAction;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class BranchController extends Controller
{
    public function read(Request $request)
    {
        $user = $request->user();

        $GetUserRoleAction = new GetUserRoleAction;

        $userRole = $GetUserRoleAction->execute($user);

        //if user is admin, return all branches
        if($userRole == 'admin'){
            $branches = Branch::all();
        }
        //else if user is manager, return only branches that user is assigned to
        elseif($userRole == 'manager'){
            $branches = Branch::where('manager_id', $user->id)->get();
        }
        return $branches;
    }
    public function create(Request $request){
        $request->validate([
            'name' => ['string', 'required'],
            'latitude' => ['string', 'required'],
            'longitude' => ['string', 'required'],
        ]);


        $this->middleware('can:manage branches');

        $branchModel = Branch::create([
            'name' => $request['name'],
            'latitude' => $request['latitude'],
            'longitude' => $request['longitude'],
        ]);

        //create manage branch permission
        $permission = Permission::create(['name' => 'manage branch ' . $branchModel->id ,'model_id' => $branchModel->id]);

        return $branchModel;

    }

    public function update(Request $request){
        $request->validate([
            'branch_id' => ['integer', 'required'],
            'name' => ['string', 'required'],
            'latitude' => ['string', 'required'],
            'longitude' => ['string', 'required'],
            'manager_id' => ['integer', 'nullable'],
        ]);

        $this->middleware('can:manage branches');

        $branchModel = Branch::find($request['branch_id']);

        $branchModel->update([
            'name' => $request['name'],
            'latitude' => $request['latitude'],
            'longitude' => $request['longitude'],
        ]);

        if ($request->has('manager_id')){
           $manager = User::find($request['manager_id']);

           $branchModel->manager()->associate($manager);
        }

        return $branchModel;

    }
}
