<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Settings::create([
            'name' => 'siteName',
            'value' => 'LaravelTinkerConsole',
        ]);
        Settings::create([
            'name' => 'siteDescription',
            'value' => 'LaravelTinkerConsole',
        ]);
        Settings::create([
            'name' => 'siteEmail',
            'value' => 'LaravelTinkerConsole',
        ]);
        Settings::create([
            'name' => 'sitePhone',
            'value' => 'LaravelTinkerConsole',
        ]);
        Settings::create([
            'name' => 'siteTwitter',
            'value' => 'LaravelTinkerConsole',
        ]);
        Settings::create([
            'name' => 'siteInstagram',
            'value' => 'LaravelTinkerConsole',
        ]);
        Settings::create([
            'name' => 'shippingCities',
            'value' => 'جدة',
        ]);
        Settings::create([
            'name' => 'shippingCost',
            'value' => '10',
        ]);
        Settings::create([
            'name' => 'shippingTime',
            'value' => '3',
        ]);
        Settings::create([
            'name' => 'VATPercentage',
            'value' => '0.15',
        ]);


    }
}
