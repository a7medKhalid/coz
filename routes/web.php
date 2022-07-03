<?php

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

        Route::get('' , [DashboardViewController::class, 'index'])->name('dashboard');

        Route::middleware('can:manage branches')->group(function (){
            Route::get('/branches' ,[BranchesViewController::class, 'index'])->name('branches');
            Route::post('/branches' ,[BranchesViewController::class, 'addBranch'])->name('addBranch');

            Route::get('/employees' ,[EmployeesViewController::class, 'index'])->name('employees');
            Route::post('/employees' ,[EmployeesViewController::class, 'inviteEmployee'])->name('inviteEmployee');

        });


    });

});

require __DIR__.'/auth.php';
