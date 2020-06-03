<?php

namespace App\Http\Controllers\Api;

use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeRequestStoreRequest;
use Exception;
use Illuminate\Support\Facades\Artisan;

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

    public function getAll()
    {
        $exchangeRequests = ExchangeRequest::all();
        return response()->json(["success" => true, "exchange_requests" => $exchangeRequests->toArray()]);
    }
}
