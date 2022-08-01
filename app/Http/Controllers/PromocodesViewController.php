<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Zorb\Promocodes\Models\Promocode;

class PromocodesViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $allowedDashboardPages)
    {


        //get all promocodes
        $promocodes = Promocode::all();

        $allowedDashboardPages = $allowedDashboardPages->execute($request->user());

        return Inertia::render('Dashboard/Promocodes/index', ['allowedDashboardPages' => $allowedDashboardPages, 'promocdes' => $promocodes]);
    }

    public function createPromocode(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:promocodes',
            'discount' => 'required|numeric',
            'expired_at' => 'required|date',
            'usages_left' => 'required|numeric',
            'multi_use' => 'required|boolean',
        ]);

        $promocode = Promocode::create([
            'code' => $request->code,
            'details' => ['discount' => $request->discount],
            'usages_left' => $request->usages_left,
            'multi_use' => $request->multi_use,
            'expired_at' => $request->expired_at,
        ]);

        return back()->with('success', 'Promocode created successfully');
    }

    public function editPromocode(Request $request)
    {

        $request->validate([
            'promocode_id' => 'required|exists:promocodes,id',
            'discount' => 'required|numeric',
            'expired_at' => 'required|date',
            'usages_left' => 'required|numeric',
            'multi_use' => 'required|boolean',
        ]);

        $promocode = Promocode::find($request->promocode_id);

        $promocode->update([
            'details' => ['discount' => $request->discount],
            'usages_left' => $request->usages_left,
            'multi_use' => $request->multi_use,
            'expired_at' => $request->expired_at,
        ]);

        $promocode->save();

        return back()->with('success', 'Promocode updated successfully');

    }

    public function deletePromocode(Request $request)
    {
        $request->validate([
            'promocode_id' => 'required|exists:promocodes,id',
        ]);

        $promocode = Promocode::find($request->promocode_id);

        $promocode->delete();

        return back()->with('success', 'Promocode deleted successfully');
    }


}


