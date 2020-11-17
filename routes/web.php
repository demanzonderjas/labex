<?php

use App\Http\Middleware\VerifyAdmin;
use App\Http\Middleware\VerifyAuthorized;
use App\User;
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
});
Route::get('/about-us', function () {
    return view('index');
});

Route::get('/login/surfconext', 'Auth\LoginController@redirectToProvider');
Route::get('/login/surfconext/callback', 'Auth\LoginController@handleProviderCallback');

Route::get('/test-request-login', function () {
    Auth::logout();
    $user = User::where('name', 'Request Demo')->first();
    Auth::login($user);
    return redirect()->to('/app/dashboard');
});

Route::get('/test-offer-login', function () {
    Auth::logout();
    $user = User::where('name', 'Offer Demo')->first();
    Auth::login($user);
    return redirect()->to('/app/dashboard');
});

Route::get('/logout', function () {
    Auth::logout();
    return redirect()->to('/');
});

Route::get('/app', function () {
    return view('index');
});

function fakeAdminLogin()
{
    $user = User::where('is_admin', true)->first();
    Auth::login($user);
}

Route::group(['middleware' => VerifyAdmin::class], function () {
    Route::get('/admin/{page?}', function () {
        fakeAdminLogin();
        return view('admin');
    });
    Route::get('/admin/{page?}/{action?}/{id?}', function () {
        fakeAdminLogin();
        return view('admin');
    });
});

Route::fallback(function () {
    return view('dashboard');
})->middleware(VerifyAuthorized::class);
