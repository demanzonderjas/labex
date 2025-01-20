<?php

use App\Http\Middleware\VerifyAdmin;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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
    return view('index');
})->name('home');
Route::get('/about-us', function () {
    return view('index');
});

Route::get('/login/surfconext', 'Auth\LoginController@redirectToProvider');
Route::get('/login/surfconext/callback', 'Auth\LoginController@handleProviderCallback');

Route::get('/logout', function () {
    Auth::logout();
    return redirect()->to('/');
});

Route::get('/app', function () {
    return view('index');
});

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/app/dashboard');
})->middleware(['signed'])->name('verification.verify');

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::group(['middleware' => VerifyAdmin::class], function () {
    Route::get('/admin/{page?}', function () {
        return view('admin');
    });
    Route::get('/admin/{page?}/{action?}/{id?}', function () {
        return view('admin');
    });
});

Route::fallback(function () {
    return view('dashboard');
})->middleware('verified');
