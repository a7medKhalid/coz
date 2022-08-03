<?php

use App\Http\Controllers\CartViewController;
use App\Http\Controllers\CheckoutViewController;
use App\Http\Controllers\CustomerViewController;
use App\Http\Controllers\InventoryViewController;
use App\Http\Controllers\ProductsViewController;
use App\Http\Controllers\PromocodesViewController;
use App\Http\Controllers\SettingsViewController;
use App\Http\Controllers\StoreViewController;
use App\Http\Controllers\TrackingViewController;
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

        Route::middleware('can:manage promocodes')->group(function (){
            Route::get('/promocodes' ,[PromocodesViewController::class, 'index'])->name('promocodes');
            Route::post('/promocodes' ,[PromocodesViewController::class, 'createPromocode'])->name('createPromocode');
            Route::post('/promocodes/update' ,[PromocodesViewController::class, 'editPromocode'])->name('editPromocode');
            Route::post('/promocodes/delete' ,[PromocodesViewController::class, 'deletePromocode'])->name('deletePromocode');
           });

        Route::middleware('can:manage customers')->group(function (){
            Route::get('/customers' ,[CustomerViewController::class, 'index'])->name('customers');
        });

        Route::middleware('can:manage settings')->group(function (){
            Route::get('/settings' ,[SettingsViewController::class, 'index'])->name('settings');
            Route::post('/settings' ,[SettingsViewController::class, 'updateSettings'])->name('updateSettings');
        });


    });

});

Route::prefix(
    '/'
)->group(function () {
    Route::get('', [StoreViewController::class, 'index'])->name('store');

    Route::get('/products', [StoreViewController::class, 'viewProduct'])->name('viewProduct');

    Route::prefix('/cart')->group(function (){
        Route::get('', [CartViewController::class, 'index'])->name('cart');
        Route::post('/update', [CartViewController::class, 'updateBranch'])->name('updateBranch');
        Route::post('/add', [CartViewController::class, 'addToCart'])->name('addToCart');
        Route::post('/remove', [CartViewController::class, 'removeFromCart'])->name('removeFromCart');
        Route::post('/empty', [CartViewController::class, 'emptyCart'])->name('emptyCart');
    });

    Route::prefix('/checkout')->group(function (){
        Route::get('', [CheckoutViewController::class, 'index'])->name('viewOrderOptions');
        Route::post('', [CheckoutViewController::class, 'createOrder'])->name('setOrderOptions');

        Route::get('/invoice', [CheckoutViewController::class, 'invoice'])->name('invoice');

    });

    Route::prefix('/tracking')->group(function (){
        Route::get('', [TrackingViewController::class, 'index'])->name('tracking');
    });

});







require __DIR__.'/auth.php';
