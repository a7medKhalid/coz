<?php

    $allRoles = ['dashboard'];
    $adminDashboardPages = ['branches', 'employees', 'products'];
    $managerDashboardPages = ['employees', 'inventory'];
    $employeeDashboardPages = [];
    $branchEmployeeDashboardPages = ['inventory'];
    $productManagerDashboardPages = ['products'];

    $adminDashboardPages = array_merge($allRoles, $adminDashboardPages);
    $managerDashboardPages = array_merge($allRoles, $managerDashboardPages);
    $employeeDashboardPages = array_merge($allRoles, $employeeDashboardPages);
    $branchEmployeeDashboardPages = array_merge($allRoles, $employeeDashboardPages);
    $productManagerDashboardPages = array_merge($allRoles, $productManagerDashboardPages);


return [
        'adminDashboardPages' => $adminDashboardPages ,
        'managerDashboardPages' => $managerDashboardPages,
        'employeeDashboardPages' =>$employeeDashboardPages,
        'branchEmployeeDashboardPages' =>$branchEmployeeDashboardPages,
        'productManagerDashboardPages' => $productManagerDashboardPages,
    ];


