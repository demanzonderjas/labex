<?php

namespace App\Http\Controllers\Api;

use App\ExchangeAttempt;
use App\Http\Controllers\Controller;
use App\MaterialMatch;
use App\User;

class StatsController extends Controller
{

    public function getDashboardStats()
    {
        $requests = ExchangeAttempt::requests()->orderBy('created_at')->count();
        $offers = ExchangeAttempt::offers()->orderBy('created_at')->count();
        $users = User::all()->count();
        $matches = MaterialMatch::where('status', config('atex.constants.match_status.approved'))->count();
        $totalSaved = MaterialMatch::where('status', config('atex.constants.match_status.approved'))->get()->reduce(function ($base, $match) {
            return $base + $match->request->amount;
        }, 0);
        $totalOffered = ExchangeAttempt::offers()->get()->reduce(function ($base, $attempt) {
            return $base + $attempt->amount;
        }, 0);

        $totalRequested = ExchangeAttempt::requests()->get()->reduce(function ($base, $attempt) {
            return $base + $attempt->amount;
        }, 0);

        return response()->json([
            "requests" => $requests,
            "offers" => $offers,
            "users" => $users,
            "matches" => $matches,
            "total_offered" => $totalOffered,
            "total_requested" => $totalRequested,
            "total_saved" => $totalSaved
        ]);
    }
}
