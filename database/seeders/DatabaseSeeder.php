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

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'role' => 'admin'
        ]);

        \App\Models\User::factory()->create([
            'name' => 'employee',
            'email' => 'employee@test.com',
            'role' => 'employee'
        ]);

        \App\Models\User::factory()->create([
            'name' => 'customer',
            'email' => 'customer@test.com',
            'role' => 'customer'
        ]);
    }
}
