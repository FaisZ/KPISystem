<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\Auth\RegisteredUserController;
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

Route::get('/pegawai', [PegawaiController::class, 'index'])->middleware(['auth', 'verified'])->name('pegawai');
Route::get('/pegawai/add', [PegawaiController::class, 'addActivity']);
Route::post('e/addPegawai', [PegawaiController::class, 'addPegawai']);

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//          'canLogin' => Route::has('login'),
//         //'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/register', [RegisteredUserController::class, 'create'])->middleware(['auth', 'verified'])->name('register');
Route::post('register', [RegisteredUserController::class, 'store']);


Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/administrator', [AdministratorController::class, 'index'])->middleware(['auth', 'verified'])->name('administrator');
Route::get('/administrator/add_unsur', [AdministratorController::class, 'newUnsur'])->middleware(['auth', 'verified'])->name('add_unsur');
Route::post('/administrator/add_unsur', [AdministratorController::class, 'addUnsur'])->middleware(['auth', 'verified'])->name('add_unsur');

Route::get('/administrator/aktivitas', [AdministratorController::class, 'listAktivitas'])->middleware(['auth', 'verified'])->name('master_aktivitas');
Route::get('/administrator/add_aktivitas', [AdministratorController::class, 'newAktivitas'])->middleware(['auth', 'verified'])->name('add_aktivitas');
Route::post('/administrator/add_aktivitas', [AdministratorController::class, 'addAktivitas'])->middleware(['auth', 'verified'])->name('add_aktivitas');
Route::post('/administrator/update_aktivitas', [AdministratorController::class, 'updateAktivitas'])->middleware(['auth', 'verified'])->name('update_aktivitas');

Route::get('/administrator/users', [AdministratorController::class, 'listUsers'])->middleware(['auth', 'verified'])->name('master_users');

Route::get('/e', function () {
  return Inertia::render('Experiments', ['hello' => 'world']);
})->middleware(['auth', 'verified'])->name('e');

require __DIR__.'/auth.php';
