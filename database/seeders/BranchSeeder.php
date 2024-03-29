<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $manager = User::factory()->create([
            'name' => 'branch1manager',
            'email' => 'branch1manager@test.com',
        ]);

        $manager->assignRole('branchManager');
        $manager->assignRole('employee');


        $branch = Branch::factory()->create([
            'name' => 'Branch 1',
            'user_id' => $manager->id,
        ]);


    }
}
