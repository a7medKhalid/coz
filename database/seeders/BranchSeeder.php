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

        $manager->assignRole('manager');
        $manager->assignRole('employee');


        $branch = Branch::factory()->create([
            'name' => 'Branch 1',
            'manager_id' => $manager->id,
        ]);

        //create manage branch permission
        $permission = Permission::create(['name' => 'manage branch ' . $branch->id ,'model_id' => $branch->id]);

    }
}
