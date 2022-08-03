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

        $allowedDashboardPages = $allowedDashboardPages->execute($request->user());


        return Inertia::render('Dashboard/Settings/index', ['allowedDashboardPages' => $allowedDashboardPages, 'settings' => $settings]);
    }

    public function updateSettings(Request $request){
        $request->validate([
            'siteName' => ['string', 'required'],
            'siteDescription' => ['string', 'required'],
            'siteEmail' => ['string', 'required'],
            'sitePhone' => ['string', 'required'],
            'siteTwitter' => ['string', 'required'],
            'siteInstagram' => ['string', 'required'],

            'shippingCost' => ['string', 'required'],
            'shippingTime' => ['string', 'required'],
            'shippingCities' => ['array', 'required'],
        ]);

        $siteNameSetting = Settings::where('name', 'siteName')->first();
        $siteNameSetting->value = $request['siteName'];

        $siteDescriptionSetting = Settings::where('name', 'siteDescription')->first();
        $siteDescriptionSetting->value = $request['siteDescription'];

        $siteEmailSetting = Settings::where('name', 'siteEmail')->first();
        $siteEmailSetting->value = $request['siteEmail'];

        $sitePhoneSetting = Settings::where('name', 'sitePhone')->first();
        $sitePhoneSetting->value = $request['sitePhone'];

        $siteTwitterSetting = Settings::where('name', 'siteTwitter')->first();
        $siteTwitterSetting->value = $request['siteTwitter'];

        $siteInstagramSetting = Settings::where('name', 'siteInstagram')->first();
        $siteInstagramSetting->value = $request['siteInstagram'];

        $shippingCostSetting = Settings::where('name', 'shippingCost')->first();
        $shippingCostSetting->value = $request['shippingCost'];

        $shippingTimeSetting = Settings::where('name', 'shippingTime')->first();
        $shippingTimeSetting->value = $request['shippingTime'];

        $shippingCitiesSetting = Settings::where('name', 'shippingCities')->first();
        $shippingCitiesSetting->value = implode(',', $request['shippingCities']);


        $siteNameSetting->save();
        $siteDescriptionSetting->save();
        $siteEmailSetting->save();
        $sitePhoneSetting->save();
        $siteTwitterSetting->save();
        $siteInstagramSetting->save();
        $shippingCostSetting->save();
        $shippingTimeSetting->save();
        $shippingCitiesSetting->save();

        return back();

    }



}
