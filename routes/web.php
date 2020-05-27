<?php

use App\Http\Middleware\VerifyAdmin;
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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::group(['middleware' => VerifyAdmin::class], function () {
    Route::get('/admin/{page?}', function () {
        return view('admin');
    });
});

Route::fallback(function () {
    $user = User::first();
    Auth::login($user);
    return view('welcome');
});
