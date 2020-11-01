<?php

namespace App\Http\Controllers\Api;

use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Mail\MatchMadeEmail;
use App\Match;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class MatchController extends Controller
{

    public function getAll()
    {
        $matches = Match::all();
        return response()->json(["success" => true, "matches" => $matches->toArray()]);
    }

    public function user(Request $request)
    {
        $matches = Match::whereBelongsToUser($request->user())->get();

        return response()->json(["matches" => $matches->toArray()]);
    }

    public function myLatest(Request $request)
    {
        $match = Match::whereBelongsToUser($request->user())->latest()->first();

        return response()->json(["match" => $match->toArray()]);
    }

    public static function create($offerId, $requestId)
    {
        $match = new Match();
        $match->exchange_offer_id = $offerId;
        $match->exchange_request_id = $requestId;
        $match->save();

        $offer = ExchangeOffer::find($offerId);
        $request = ExchangeRequest::find($requestId);
        Mail::to($offer->user)->queue(new MatchMadeEmail($match, $offer->user));
        Mail::to($request->user)->queue(new MatchMadeEmail($match, $request->user));

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
