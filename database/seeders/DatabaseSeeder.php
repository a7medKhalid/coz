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
//         \App\Models\User::factory(10)->create();

        //Production seeder
//        $this->call([
//            RoleAndPermissionsSeeder::class,
//           AdminSeeder::class,
//        ]);

        //Development seeder
        $this->call([
            RoleAndPermissionsSeeder::class,
            AdminSeeder::class,
            UserSeeder::class,
        ]);

        \App\Models\User::factory()->create([
            'name' => 'customer',
            'email' => 'customer@test.com',
            'role' => 'customer'
        ]);
    }
}
