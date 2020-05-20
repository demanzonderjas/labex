<?php

namespace App\Http\Controllers\Api;

use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeOfferStoreRequest;
use App\Sample;
use Exception;

class ExchangeOfferController extends Controller
{
    public function store(ExchangeOfferStoreRequest $request)
    {
        try {
            $validated = $request->validated();
            $sample = new Sample($validated);
            $sample->save();
            $exchangeOffer = new ExchangeRequest($validated);
            $exchangeOffer->user_id = $request->user()->id;
            $exchangeOffer->sample_id = $sample->id;
            $exchangeOffer->save();
            return response()->json(["success" => true, "exchange_request" => $exchangeOffer->fresh()->toArray()]);
        } catch (Exception $e) {
            return response()->json(["success" => false, "error" => $e]);
        }
    }
}
