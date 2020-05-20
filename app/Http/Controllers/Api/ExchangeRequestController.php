<?php

namespace App\Http\Controllers\Api;

use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeRequestStoreRequest;
use App\Sample;
use App\User;
use Exception;

class ExchangeRequestController extends Controller
{

    public function store(ExchangeRequestStoreRequest $request)
    {
        $validated = $request->validated();
        $token = $request->header('X-API-USER-TOKEN');
        $user = User::where('token', $token)->firstOrFail();
        try {
            $sample = new Sample($validated);
            $sample->save();
            $exchangeRequest = new ExchangeRequest($validated);
            $exchangeRequest->user_id = $user->id;
            $exchangeRequest->sample_id = $sample->id;
            $exchangeRequest->save();
            return response()->json(["success" => true, "exchange_request" => $exchangeRequest->fresh()->toArray()]);
        } catch (Exception $e) {
            return response()->json(["success" => false, "error" => $e]);
        }
    }
}
