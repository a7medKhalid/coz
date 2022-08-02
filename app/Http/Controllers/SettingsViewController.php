<?php

namespace App\Http\Controllers;

use App\Actions\AllowedDashboardPages;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsViewController extends Controller
{
    public function index(Request $request, AllowedDashboardPages $allowedDashboardPages)
    {
        $settings = Settings::all();
        return Inertia::render('Dashboard/Settings/index', ['allowedDashboardPages' => $allowedDashboardPages, 'settings' => $settings]);
    }



}
