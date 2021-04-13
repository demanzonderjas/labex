<?php

namespace App\Http\Controllers\Api;

use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeRequestStoreRequest;
use Exception;
use Illuminate\Http\Request;
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

            return response()->json(["success" => true, "exchange_request" => $exchangeRequest->toArray()]);
        } catch (Exception $e) {
            return response()->json(["success" => false, "error" => $e]);
        }
    }

    public function getMyLatest(Request $request)
    {
        $requests = ExchangeRequest::where(function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->latest()->get();

        return response()->json(["success" => true, "exchange_requests" => $requests]);
    }

    public function getMyAll(Request $request)
    {
        $requests = ExchangeRequest::where(function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->latest()->get();

        return response()->json(["success" => true, "exchange_requests" => $requests]);
    }

    public function getById($id)
    {
        $exchangeRequest = ExchangeRequest::findOrFail($id);
        return response()->json(["success" => true, "exchange_request" => $exchangeRequest->toArray()]);
    }

    public function deleteById($id)
    {
        $exchangeRequest = ExchangeRequest::findOrFail($id);
        $exchangeRequest->delete();
        return response()->json(["success" => true, "exchange_request" => $exchangeRequest->toArray()]);
    }

    public function getAll()
    {
        $exchangeRequests = ExchangeRequest::doesntHave('match')->where('active', true)->get();
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
