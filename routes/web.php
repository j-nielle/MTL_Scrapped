<?php

use App\Http\Controllers\NotifController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SSEController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sse-request-table', [SSEController::class, 'fetchData'])->middleware(['auth'])->name('sse-request-table');
Route::get('/sse-request-alert', [SSEController::class, 'fetchData'])->middleware(['auth'])->name('sse-request-alert');

Route::get('/notifications', [NotifController::class,'index'])->middleware(['auth', 'verified'])->name('notifications');

Route::get('/dashboard', [DashboardController::class,'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
