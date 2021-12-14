<?php

use App\Http\Middleware\VerifyAdmin;
use App\Http\Middleware\VerifyApiUserToken;
use App\Http\Middleware\VerifyAuthorized;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api'], function () {

    Route::post('signups/store', 'SignupController@store')->withoutMiddleware(VerifyApiUserToken::class);
    Route::post('external-login', '\App\Http\Controllers\Auth\LoginController@handleExternalLogin')->withoutMiddleware(VerifyApiUserToken::class);

    Route::group(['middleware' => VerifyAuthorized::class], function () {
        Route::post('exchange-attempt/store', 'ExchangeAttemptController@store');
        Route::post('exchange-attempts', 'ExchangeAttemptController@getAll');
        Route::get('exchange-attempts/mine', 'ExchangeAttemptController@getMyAll');
        Route::post('exchange-attempts/mine-latest', 'ExchangeAttemptController@getMyLatest');
        Route::get('exchange-attempt/{id}', 'ExchangeAttemptController@getById');
        Route::middleware('auth.owner')->post('exchange-attempt/{attempt_id}/delete', 'ExchangeAttemptController@deleteById');
        Route::post('exchange-attempt/match/{attempt_id}', 'ExchangeAttemptController@match');

        Route::get('my-matches', 'MatchController@user');
        Route::get('my-latest-match', 'MatchController@myLatest');
        Route::post('matches/cancel/{matchId}', 'MatchController@cancel');

        Route::get('dashboard-stats', 'StatsController@getDashboardStats');
        Route::get('faq', 'FaqController@getByCategory');

        Route::get('active-user', 'UserController@getActiveUser');

        Route::post('alert', 'AlertController@store');
        Route::delete('alert/{alert_id}', 'AlertController@delete');
        Route::get('alerts/mine', 'AlertController@getMine');
    });

    Route::group(['middleware' => VerifyAdmin::class], function () {
        Route::get('matches', 'MatchController@getAll');
        Route::get('faq-items', 'FaqController@getAllItems');
        Route::get('faq-items/{itemId}', 'FaqController@getItemById');
        Route::post('faq-items/create', 'FaqController@createItem');
        Route::post('faq-items/edit/{itemId}', 'FaqController@editItem');
        Route::post('faq-items/delete/{itemId}', 'FaqController@deleteItem');
        Route::post('matches/approve/{matchId}', 'MatchController@approve');
        Route::post('matches/reject/{matchId}', 'MatchController@reject');

        Route::get('signups', 'SignupController@getAll');
        Route::post('signups/approve/{signupId}', 'SignupController@approve');
        Route::post('signups/decline/{signupId}', 'SignupController@decline');
        Route::post('signups/delete/{signupId}', 'SignupController@delete');

        Route::get('users', 'UserController@getAll');
        Route::post('user', 'UserController@store');
        Route::delete('user/{user_id}', 'UserController@delete');
    });
});
