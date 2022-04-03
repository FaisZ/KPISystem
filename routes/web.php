<?php

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

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/pegawai', function () {
  return Inertia::render('PegawaiDashboard');
})->middleware(['auth', 'verified'])->name('pegawai');

Route::get('/e', function () {
  return Inertia::render('Experiments');
})->middleware(['auth', 'verified'])->name('e');

Route::view('/w', 'welcome')->middleware(['auth', 'verified']);
require __DIR__.'/auth.php';
