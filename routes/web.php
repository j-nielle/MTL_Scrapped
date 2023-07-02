<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\Student;
use App\Models\Mood;
use App\Models\Contact;
use App\Models\RequestType;
use App\Models\Requests;
use App\Models\StudentMood;
use App\Models\AnonMood;
use App\Models\Reason;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/notifications', function(){
    $contact = Contact::all();
    $requestType = RequestType::all();
    $requests = Requests::all();

    return view('notifications', [
        'contact' => $contact,
        'requestType' => $requestType,
        'requests' => $requests
    ]);
})->middleware(['auth', 'verified'])->name('notifications');

Route::get('/dashboard', function () {
    $mood = Mood::all();
    $reason = Reason::all();
    $student = Student::all();
    $studentMood = StudentMood::all();
    $anonMood = AnonMood::all();

    //dd($contact, $requestType, $requests, $mood, $reason, $student, $studentMood, $anonMood);

    return view('dashboard',[
        'mood' => $mood,
        'reason' => $reason,
        'student' => $student,
        'studentMood' => $studentMood,
        'anonMood' => $anonMood
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
