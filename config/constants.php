<?php

    $allRoles = ['dashboard'];
    $adminDashboardPages = ['branches', 'employees', 'products','categories', 'promocodes', 'customers', 'settings'];
    $managerDashboardPages = ['employees', 'inventory'];
    $employeeDashboardPages = [];
    $branchEmployeeDashboardPages = ['inventory'];
    $productManagerDashboardPages = ['products', 'categories'];

    $adminDashboardPages = array_merge($allRoles, $adminDashboardPages);
    $managerDashboardPages = array_merge($allRoles, $managerDashboardPages);
    $employeeDashboardPages = array_merge($allRoles, $employeeDashboardPages);
    $branchEmployeeDashboardPages = array_merge($allRoles, $branchEmployeeDashboardPages);
    $productManagerDashboardPages = array_merge($allRoles, $productManagerDashboardPages);


return [
        'adminDashboardPages' => $adminDashboardPages ,
        'managerDashboardPages' => $managerDashboardPages,
        'employeeDashboardPages' =>$employeeDashboardPages,
        'branchEmployeeDashboardPages' =>$branchEmployeeDashboardPages,
        'productManagerDashboardPages' => $productManagerDashboardPages,
    ];


