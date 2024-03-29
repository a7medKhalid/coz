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

        $manager->assignRole('branchManager');
        $manager->assignRole('employee');


        $productManager = User::factory()->create([
            'name' => 'productManager',
            'email' => 'productManager@test.com',
        ]);

        $productManager->assignRole('productManager');
        $productManager->assignRole('employee');




        $employee = User::factory()->create([
            'name' => 'employee',
            'email' => 'employee@test.com',
        ]);

        $employee->assignRole('employee');

        User::factory()->create([
            'name' => 'customer',
            'email' => 'customer@test.com',
        ]);

    }
}
