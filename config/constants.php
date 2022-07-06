<?php

    $allRoles = ['dashboard'];
    $adminDashboardPages = ['branches', 'employees'];
    $managerDashboardPages = ['employees'];
    $employeeDashboardPages = [];
    $branchEmployeeDashboardPages = [];
    $productManagerDashboardPages = [];

    $adminDashboardPages = array_merge($adminDashboardPages,$allRoles);
    $managerDashboardPages = array_merge($managerDashboardPages, $allRoles);
    $employeeDashboardPages = array_merge($employeeDashboardPages, $allRoles);
    $branchEmployeeDashboardPages = array_merge($employeeDashboardPages, $allRoles);
    $productManagerDashboardPages = array_merge($productManagerDashboardPages, $allRoles);


return [
        'adminDashboardPages' => $adminDashboardPages ,
        'managerDashboardPages' => $managerDashboardPages,
        'employeeDashboardPages' =>$employeeDashboardPages,
        'branchEmployeeDashboardPages' =>$branchEmployeeDashboardPages,
        'productManagerDashboardPages' => $productManagerDashboardPages,
    ];


