<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Match;

class MatchController extends Controller
{

    public function getAll()
    {
        $matches = Match::all();
        return response()->json(["success" => true, "matches" => $matches->toArray()]);
    }

    public static function create($offerId, $requestId)
    {
        $match = new Match();
        $match->exchange_offer_id = $offerId;
        $match->exchange_request_id = $requestId;
        $match->save();

        return $match;
    }

    public function approve(int $matchId)
    {
        $match = Match::find($matchId);
        if (!$match) {
            return response()->json(["success" => false, "message" => "Match does not exist"]);
        }
        $match->awaiting_approval = false;
        $match->approved = true;
        $match->save();
        return response()->json(["success" => true]);
    }

    public function reject(int $matchId)
    {
        $match = Match::find($matchId);
        if (!$match) {
            return response()->json(["success" => false, "message" => "Match does not exist"]);
        }
        $match->awaiting_approval = false;
        $match->save();
        return response()->json(["success" => true]);
    }
}
