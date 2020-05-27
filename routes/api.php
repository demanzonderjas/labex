<?php

use App\Http\Middleware\VerifyAdmin;
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
    Route::post('exchange-requests/store', 'ExchangeRequestController@store');
    Route::post('exchange-offers/store', 'ExchangeOfferController@store');
    Route::get('exchange-offers', 'ExchangeOfferController@getAll');
    Route::get('exchange-requests', 'ExchangeRequestController@getAll');

    Route::group(['middleware' => VerifyAdmin::class], function () {
        Route::get('matches', 'MatchController@getAll');
        Route::post('matches/approve/{matchId}', 'MatchController@approve');
        Route::post('matches/reject/{matchId}', 'MatchController@reject');
    });
});
