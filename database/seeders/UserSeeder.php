<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //user seeder





        $manager = User::factory()->create([
            'name' => 'manager',
            'email' => 'manager@test.com',
        ]);

        $manager->assignRole('manager');

        $manager = User::factory()->create([
            'name' => 'employee',
            'email' => 'employee@test.com',
        ]);

        $manager->assignRole('employee');

        User::factory()->create([
            'name' => 'customer',
            'email' => 'customer@test.com',
        ]);

    }
}
