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
        $managerRole = Role::create(['name' => 'branchManager']);
        $employeeRole = Role::create(['name' => 'employee']);
        $branchEmployeeRole = Role::create(['name' => 'branchEmployee']);
        $productManager = Role::create(['name' => 'productManager']);



        //Create Permissions
        Permission::firstOrCreate(['name' => 'send employee invite']);

        //create view dashboard pages permissions

        $adminDashboardPages = config('constants.adminDashboardPages');
        $managerDashboardPages = config('constants.managerDashboardPages');
        $employeeDashboardPages = config('constants.employeeDashboardPages');
        $branchEmployeeDashboardPages = config('constants.branchEmployeeDashboardPages');
        $productManagerDashboardPages = config('constants.productManagerDashboardPages');

        foreach ($adminDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'manage ' . $page]);
            $adminRole->givePermissionTo($permission);
        }

        foreach ($managerDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'manage ' . $page]);
            $managerRole->givePermissionTo($permission);
        }

        foreach ($employeeDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'manage ' . $page]);
            $employeeRole->givePermissionTo($permission);
        }

        foreach ($branchEmployeeDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'manage ' . $page]);
            $branchEmployeeRole->givePermissionTo($permission);
        }

        foreach ($productManagerDashboardPages as $page){
            $permission = Permission::firstOrCreate(['name' => 'manage ' . $page]);
            $productManager->givePermissionTo($permission);
        }


        //assign permissions to roles
        $adminRole->givePermissionTo(['send employee invite' ]);
        $managerRole->givePermissionTo(['send employee invite' ]);

    }
}
