<?php

namespace App\Http\Controllers\Api;

use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeRequestStoreRequest;
use App\Sample;
use Exception;

class ExchangeRequestController extends Controller
{

    public function store(ExchangeRequestStoreRequest $request)
    {
        try {
            $validated = $request->validated();
            $exchangeRequest = new ExchangeRequest($validated);
            $exchangeRequest->user_id = $request->user()->id;
            $exchangeRequest->save();
            $sample = new Sample($validated);
            $sample->sampleable_id = $exchangeRequest->id;
            $sample->sampleable_type = ExchangeRequest::class;
            $sample->save();
            return response()->json(["success" => true, "exchange_request" => $exchangeRequest->fresh()->toArray()]);
        } catch (Exception $e) {
            return response()->json(["success" => false, "error" => $e]);
        }
    }
}
