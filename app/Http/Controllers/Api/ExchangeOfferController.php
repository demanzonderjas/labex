<?php

namespace App\Http\Controllers\Api;

use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeOfferStoreRequest;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;

class ExchangeOfferController extends Controller
{
    public function store(ExchangeOfferStoreRequest $request)
    {
        try {
            $validated = $request->validated();
            $exchangeOffer = new ExchangeOffer($validated);
            $exchangeOffer->user_id = $request->user()->id;
            $exchangeOffer->save();

            return response()->json(["success" => true, "exchange_offer" => $exchangeOffer->toArray()]);
        } catch (Exception $e) {
            return response()->json(["success" => false, "error" => $e]);
        }
    }

    public function getMyLatest(Request $request)
    {
        $offers = ExchangeOffer::where(function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->latest()->limit(config('samples.SHOW_TOTAL_LAST'))->get();

        return response()->json(["success" => true, "exchange_offers" => $offers]);
    }

    public function getById($id)
    {
        $offer = ExchangeOffer::findOrFail($id);
        return response()->json(["success" => true, "exchange_offer" => $offer->toArray()]);
    }

    public function getAll()
    {
        $exchangeOffers = ExchangeOffer::doesntHave('match')->where('active', true)->get();
        return response()->json(["success" => true, "exchange_offers" => $exchangeOffers->toArray()]);
    }

    public function match(Request $request, $id)
    {
        $offer = ExchangeOffer::findOrFail($id);
        $exchangeRequest = new ExchangeRequest($request->exchange_request);
        $exchangeRequest->user_id = Auth::user()->id;
        $exchangeRequest->save();

        $match = MatchController::create($offer->id, $exchangeRequest->id);

        return response()->json(["success" => true, "match" => $match->toArray()]);
    }
}
