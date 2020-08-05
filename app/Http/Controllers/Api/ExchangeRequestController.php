<?php

namespace App\Http\Controllers\Api;

use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeRequestStoreRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;

class ExchangeRequestController extends Controller
{

    public function store(ExchangeRequestStoreRequest $request)
    {
        try {
            $validated = $request->validated();
            $exchangeRequest = new ExchangeRequest($validated);
            $exchangeRequest->user_id = $request->user()->id;
            $exchangeRequest->save();

            Artisan::call("match:create");

            return response()->json(["success" => true, "exchange_request" => $exchangeRequest->toArray()]);
        } catch (Exception $e) {
            return response()->json(["success" => false, "error" => $e]);
        }
    }

    public function getById($id)
    {
        $exchangeRequest = ExchangeRequest::findOrFail($id);
        return response()->json(["success" => true, "exchange_request" => $exchangeRequest->toArray()]);
    }

    public function getAll()
    {
        $exchangeRequests = ExchangeRequest::all();
        return response()->json(["success" => true, "exchange_requests" => $exchangeRequests->toArray()]);
    }

    public function match(Request $request, $id)
    {
        $exchangeRequest = ExchangeRequest::findOrFail($id);
        $exchangeOffer = new ExchangeOffer($request->exchange_offer);
        $exchangeOffer->user_id = Auth::user()->id;
        $exchangeOffer->save();

        $match = MatchController::create($exchangeOffer->id, $exchangeRequest->id);

        return response()->json(["success" => true, "match" => $match->toArray()]);
    }
}
