<?php

    $allRoles = ['dashboard'];
    $adminDashboardPages = ['branches'];
    $managerDashboardPages = [];
    $employeeDashboardPages = [];
    $productManagerDashboardPages = [];

    $adminDashboardPages = array_merge($adminDashboardPages,$allRoles);
    $managerDashboardPages = array_merge($managerDashboardPages, $allRoles);
    $employeeDashboardPages = array_merge($employeeDashboardPages, $allRoles);
    $productManagerDashboardPages = array_merge($productManagerDashboardPages, $allRoles);


return [
        'adminDashboardPages' => $adminDashboardPages ,
        'managerDashboardPages' => $managerDashboardPages,
        'employeeDashboardPages' =>$employeeDashboardPages,
        'productManagerDashboardPages' => $productManagerDashboardPages,
    ];


