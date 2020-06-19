<?php

namespace App\Http\Controllers\Api;

use App\ExchangeOffer;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeOfferStoreRequest;
use Exception;
use Illuminate\Support\Facades\Artisan;

class ExchangeOfferController extends Controller
{
    public function store(ExchangeOfferStoreRequest $request)
    {
        try {
            $validated = $request->validated();
            $exchangeOffer = new ExchangeOffer($validated);
            $exchangeOffer->user_id = $request->user()->id;
            $exchangeOffer->save();

            Artisan::call("match:create");

            return response()->json(["success" => true, "exchange_offer" => $exchangeOffer->toArray()]);
        } catch (Exception $e) {
            return response()->json(["success" => false, "error" => $e]);
        }
    }

    public function getById($id)
    {
        $offer = ExchangeOffer::findOrFail($id);
        return response()->json(["success" => true, "exchange_offer" => $offer->toArray()]);
    }

    public function getAll()
    {
        $exchangeOffers = ExchangeOffer::all();
        return response()->json(["success" => true, "exchange_offers" => $exchangeOffers->toArray()]);
    }
}
