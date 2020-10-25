<?php

use App\Http\Middleware\VerifyAdmin;
use App\Http\Middleware\VerifyApiUserToken;
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

    Route::post('exchange-offers/store', 'ExchangeOfferController@store');
    Route::get('exchange-offers', 'ExchangeOfferController@getAll');
    Route::get('exchange-offers/my-latest', 'ExchangeOfferController@getMyLatest');
    Route::get('exchange-offer/{id}', 'ExchangeOfferController@getById');
    Route::post('exchange-offer/match/{offerId}', 'ExchangeOfferController@match');

    Route::post('exchange-requests/store', 'ExchangeRequestController@store');
    Route::get('exchange-requests', 'ExchangeRequestController@getAll');
    Route::get('exchange-requests/my-latest', 'ExchangeRequestController@getMyLatest');
    Route::get('exchange-request/{id}', 'ExchangeRequestController@getById');
    Route::post('exchange-request/match/{requestId}', 'ExchangeRequestController@match');

    Route::get('my-matches', 'MatchController@user');
    Route::get('my-latest-match', 'MatchController@myLatest');

    Route::get('dashboard-stats', 'StatsController@getDashboardStats');
    Route::get('faq', 'FaqController@getByCategory');

    Route::group(['middleware' => VerifyAdmin::class], function () {
        Route::get('matches', 'MatchController@getAll');
        Route::get('faq-items', 'FaqController@getAllItems');
        Route::get('faq-items/{itemId}', 'FaqController@getItemById');
        Route::post('faq-items/create', 'FaqController@createItem');
        Route::post('faq-items/edit/{itemId}', 'FaqController@editItem');
        Route::post('faq-items/delete/{itemId}', 'FaqController@deleteItem');
        Route::post('matches/approve/{matchId}', 'MatchController@approve');
        Route::post('matches/reject/{matchId}', 'MatchController@reject');
    });
});
