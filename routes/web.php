<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\AdministratorController;
use Illuminate\Http\Request;
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

Route::get('/pegawai', [PegawaiController::class, 'index']);
Route::get('/pegawai/add', [PegawaiController::class, 'addActivity']);
Route::post('e/addPegawai', [PegawaiController::class, 'addPegawai']);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/administrator', [AdministratorController::class, 'index'])->middleware(['auth', 'verified'])->name('administrator');
Route::get('/administrator/add_unsur', [AdministratorController::class, 'AddUnsur'])->middleware(['auth', 'verified'])->name('add_unsur');

Route::get('/e', function () {
  return Inertia::render('Experiments', ['hello' => 'world']);
})->middleware(['auth', 'verified'])->name('e');

require __DIR__.'/auth.php';
