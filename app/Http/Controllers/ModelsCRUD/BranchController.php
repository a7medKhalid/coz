<?php

namespace App\Http\Controllers\ModelsCRUD;

use App\Actions\GetUserBranchAction;
use App\Actions\GetUserRoleAction;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        //else if user is branch manager, return only branches that user is assigned to
        elseif($userRole == 'branchManager'){
            $branches = [$user->branch];
        }
        return $branches;
    }

    public function getAllBranches()
    {
        $branches = Branch::all();
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

        //remove branchManager role from old manager
        $oldManager = $branchModel->manager;
        $oldManager?->removeRole('branchManager');

        //assign employee role to manager
        $oldManager?->assignRole('employee');


        if ($request['manager_id'] != null) {


            $manager = User::find($request['manager_id']);

            //assign manager role to manager
            $manager->syncRoles(['branchManager']);

            $branchModel->manager()->associate($manager);

        }else{

            $branchModel->user_id = null;

        }

        $branchModel->save();

        return $branchModel;

    }

    public function updateInventory(Request $request){

        $request->validate([
            'product_id' => ['integer', 'required'],
            'quantity' => ['integer', 'required'],
        ]);

        $getUserBranch = new GetUserBranchAction;
        $branchModel = $getUserBranch->execute($request->user());

        $productInventory = $branchModel->inventory->where('product_id', $request['product_id'])->first();

        if($productInventory){
            $productInventory = $branchModel->updateExistingPivot($request['product_id'],[
                'quantity' => $request['quantity'],
            ]);
        }else{
            $productInventory = $branchModel->inventory()->attach($request['product_id'], ['quantity' => $request['quantity']]);
        }

        return $productInventory;

    }
}
