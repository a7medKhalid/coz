<?php

use App\Http\Controllers\InventoryViewController;
use App\Http\Controllers\ProductsViewController;
use App\Http\Controllers\StoreViewController;
use App\Http\Controllers\Views\BranchesViewController;
use App\Http\Controllers\Views\DashboardViewController;
use App\Http\Controllers\Views\EmployeesViewController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('/dashboard')->group( function () {

    Route::middleware(['auth','can:manage dashboard', 'verified'])->group(function (){

        //dashboard route
        Route::get('' , [DashboardViewController::class, 'index'])->name('dashboard');

        //branches routes
        Route::middleware('can:manage branches')->group(function (){
            Route::get('/branches' ,[BranchesViewController::class, 'index'])->name('branches');
            Route::get('/branches/add' ,[BranchesViewController::class, 'viewAddBranch'])->name('viewAddBranch');
            Route::post('/branches' ,[BranchesViewController::class, 'addBranch'])->name('addBranch');
            Route::post('/branches/update' ,[BranchesViewController::class, 'updateBranch'])->name('updateBranch');
        });

        //employees routes
        Route::middleware('can:manage employees')->group(function (){
            Route::get('/employees' ,[EmployeesViewController::class, 'index'])->name('employees');
            Route::post('/employees/invite' ,[EmployeesViewController::class, 'inviteEmployee'])->name('inviteEmployee');
            Route::post('/employees/assign-branch' ,[EmployeesViewController::class, 'assignBranchRoleToEmployee'])->name('assignBranchRoleToEmployee');
            Route::post('/employees/assign-product-manager' ,[EmployeesViewController::class, 'assignProductManagerRoleToEmployee'])->name('assignProductManagerRoleToEmployee');
            Route::post('/employees/unAssign-product-manager' ,[EmployeesViewController::class, 'unAssignProductManagerRoleToEmployee'])->name('unAssignProductManagerRoleToEmployee');
        });

        Route::middleware('can:manage products')->group(function (){
            Route::get('/products' ,[ProductsViewController::class, 'index'])->name('products');
            Route::post('/products' ,[ProductsViewController::class, 'createProduct'])->name('createProduct');
            Route::post('/products/update' ,[ProductsViewController::class, 'updateProduct'])->name('updateProduct');
            Route::post('/products/delete' ,[ProductsViewController::class, 'deleteProduct'])->name('deleteProduct');
            Route::get('/products/image' ,[ProductsViewController::class, 'getProductImages'])->name('getProductImages');
            Route::post('/products/image' ,[ProductsViewController::class, 'addProductImage'])->name('addProductImage');
            Route::post('/products/image/delete' ,[ProductsViewController::class, 'deleteProductImage'])->name('deleteProductImage');

            Route::get('/categories' ,[ProductsViewController::class, 'getCategories'])->name('categories');
            Route::post('/categories' ,[ProductsViewController::class, 'createCategory'])->name('createCategory');
            Route::post('/categories/delete' ,[ProductsViewController::class, 'deleteCategory'])->name('deleteCategory');

        });

        Route::middleware('can:manage inventory')->group(function (){
            Route::get('/inventory' ,[InventoryViewController::class, 'index'])->name('inventory');
            Route::post('/inventory/update' ,[InventoryViewController::class, 'updateBranchInventory'])->name('updateInventory');
        });


    });

});

Route::prefix(
    '/'
)->group(function () {
    Route::get('', [StoreViewController::class, 'index'])->name('store');

});







require __DIR__.'/auth.php';
