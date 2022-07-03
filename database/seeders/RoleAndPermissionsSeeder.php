<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Create Roles
        $adminRole = Role::create(['name' => 'admin']);
        $managerRole = Role::create(['name' => 'manager']);
        $employeeRole = Role::create(['name' => 'employee']);
        $productManager = Role::create(['name' => 'productManager']);



        //Create Permissions

        //create view dashboard pages permissions

        $adminDashboardPages = config('constants.adminDashboardPages');
        $managerDashboardPages = config('constants.managerDashboardPages');
        $employeeDashboardPages = config('constants.employeeDashboardPages');
        $productManagerDashboardPages = config('constants.productManagerDashboardPages');

        foreach ($adminDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'view ' . $page]);
            $adminRole->givePermissionTo($permission);
        }

        foreach ($managerDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'view ' . $page]);
            $managerRole->givePermissionTo($permission);
        }

        foreach ($employeeDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'view ' . $page]);
            $employeeRole->givePermissionTo($permission);
        }

        foreach ($productManagerDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'view ' . $page]);
            $productManager->givePermissionTo($permission);
        }


        //assign permissions to roles
//        $adminRole->givePermissionTo(['assign roles' ,'Branches CRUD']);

    }
}
