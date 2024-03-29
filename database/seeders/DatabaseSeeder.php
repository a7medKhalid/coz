<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        //Production seeder
//        $this->call([
//            RoleAndPermissionsSeeder::class,
//           AdminSeeder::class,
//           SettingsSeeder::class,
//        ]);

        //Development seeder
        $this->call([
            RoleAndPermissionsSeeder::class,
            AdminSeeder::class,
            UserSeeder::class,
            BranchSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            SettingsSeeder::class
        ]);


    }
}
