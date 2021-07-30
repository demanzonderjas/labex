<?php

namespace App\Http\Controllers\Api;

use App\ExchangeAttempt;
use App\Http\Controllers\Controller;
use App\MaterialMatch;

class StatsController extends Controller
{

    public function getDashboardStats()
    {
        $requests = ExchangeAttempt::requests()->orderBy('created_at')->get();
        $offers = ExchangeAttempt::offers()->orderBy('created_at')->get();
        $matches = MaterialMatch::where('status', config('atex.constants.match_status.approved'))->count();
        $totalSaved = MaterialMatch::where('status', config('atex.constants.match_status.approved'))->get()->reduce(function ($base, $match) {
            return $base + $match->request->amount;
        }, 0);

        return response()->json([
            "requests" => $requests,
            "offers" => $offers,
            "matches" => $matches,
            "total_saved" => $totalSaved
        ]);
    }
}
