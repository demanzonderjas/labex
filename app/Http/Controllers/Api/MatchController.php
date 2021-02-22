<?php

namespace App\Http\Controllers\Api;

use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Mail\Admin\AdminMatchMadeEmail;
use App\Mail\MatchApprovedEmail;
use App\Mail\MatchDeclinedEmail;
use App\Mail\MatchMadeEmail;
use App\MaterialMatch;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MatchController extends Controller
{

    public function getAll()
    {
        $matches = MaterialMatch::all();
        return response()->json(["success" => true, "matches" => $matches->toArray()]);
    }

    public function user(Request $request)
    {
        $matches = MaterialMatch::whereBelongsToUser($request->user())->get();

        return response()->json(["matches" => $matches->toArray()]);
    }

    public function myLatest(Request $request)
    {
        $match = MaterialMatch::whereBelongsToUser($request->user())->latest()->first();

        return response()->json(["match" => $match->toArray()]);
    }

    public static function create($offerId, $requestId)
    {
        $match = new MaterialMatch();
        $match->exchange_offer_id = $offerId;
        $match->exchange_request_id = $requestId;
        $match->save();

        $offer = ExchangeOffer::find($offerId);
        $request = ExchangeRequest::find($requestId);
        Mail::to($offer->user)->queue(new MatchMadeEmail($match, $offer->user));
        Mail::to($request->user)->queue(new MatchMadeEmail($match, $request->user));

        $admins = User::whereIsAdmin()->get();
        foreach ($admins as $admin) {
            Mail::to($admin)->queue(new AdminMatchMadeEmail($match, $admin));
        }

        return $match;
    }

    public function approve(int $matchId)
    {
        $match = MaterialMatch::find($matchId);
        if (!$match) {
            return response()->json(["success" => false, "message" => "Match does not exist"]);
        }
        $match->awaiting_approval = false;
        $match->approved = true;
        $match->save();

        Mail::to($match->exchangeOffer->user)->queue(new MatchApprovedEmail($match, $match->exchangeOffer->user));
        Mail::to($match->exchangeRequest->user)->queue(new MatchApprovedEmail($match, $match->exchangeRequest->user));

        return response()->json(["success" => true]);
    }

    public function reject(int $matchId)
    {
        $match = MaterialMatch::find($matchId);
        if (!$match) {
            return response()->json(["success" => false, "message" => "Match does not exist"]);
        }
        $match->awaiting_approval = false;
        $match->save();

        Mail::to($match->exchangeOffer->user)->queue(new MatchDeclinedEmail($match, $match->exchangeOffer->user));
        Mail::to($match->exchangeRequest->user)->queue(new MatchDeclinedEmail($match, $match->exchangeRequest->user));

        return response()->json(["success" => true]);
    }
}
