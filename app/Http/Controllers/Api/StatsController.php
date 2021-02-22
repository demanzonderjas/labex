<?php

namespace App\Http\Controllers\Api;

use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\MaterialMatch;

class StatsController extends Controller
{

    public function getDashboardStats()
    {
        $requests = ExchangeRequest::all()->count();
        $offers = ExchangeOffer::all()->count();
        $matches = MaterialMatch::where('approved', true)->count();
        $totalSaved = MaterialMatch::where('approved', true)->get()->reduce(function ($base, $match) {
            return $base + $match->exchangeRequest->amount;
        }, 0);

        return response()->json([
            "requests" => $requests,
            "offers" => $offers,
            "matches" => $matches,
            "total_saved" => $totalSaved
        ]);
    }
}
