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

        return response()->json(["match" => $match ? $match->toArray() : null]);
    }

    public static function convertRemainsToNewMaterial(MaterialMatch $match)
    {

        if ((int) $match->exchangeOffer->amount > (int) $match->exchangeRequest->amount) {
            self::createOfferFromRemainingAmount($match);
        } else if ((int) $match->exchangeRequest->amount > (int) $match->exchangeOffer->amount) {
            self::createRequestFromRemainingAmount($match);
        }

        if ($match->exchangeOffer->organs != $match->exchangeRequest->organs) {
            self::createNewFromRemainingOrgans($match);
        }
    }

    public static function createNewFromRemainingOrgans(MaterialMatch $match)
    {
        $offerOrgansArray = explode(', ', $match->exchangeOffer->organs);
        sort($offerOrgansArray);
        $requestOrgansArray = explode(', ', $match->exchangeRequest->organs);
        sort($requestOrgansArray);

        if ($offerOrgansArray === $requestOrgansArray) {
            return;
        }

        $overlappingOrgans = array_intersect($offerOrgansArray, $requestOrgansArray);

        $match->exchangeOffer->organs = implode(', ', $overlappingOrgans);
        $match->exchangeOffer->save();

        $match->exchangeRequest->organs = implode(', ', $overlappingOrgans);
        $match->exchangeRequest->save();

        $remainingOfferOrgans = array_diff($offerOrgansArray, $overlappingOrgans);
        if (count($remainingOfferOrgans) > 0) {
            $newOffer = $match->exchangeOffer->replicate()->fill([
                'organs' => implode(', ', $remainingOfferOrgans)
            ]);
            $newOffer->save();
        }

        $remainingRequestOrgans = array_diff($requestOrgansArray, $overlappingOrgans);
        if (count($remainingRequestOrgans) > 0) {
            $newRequest = $match->exchangeRequest->replicate()->fill([
                'organs' => implode(', ', $remainingRequestOrgans)
            ]);
            $newRequest->save();
        }
    }

    public static function createOfferFromRemainingAmount(MaterialMatch $match)
    {
        $newAmount = (int) $match->exchangeOffer->amount - (int) $match->exchangeRequest->amount;
        $newOffer = $match->exchangeOffer->replicate()->fill([
            'amount' => $newAmount
        ]);
        $newOffer->save();
        $match->exchangeOffer->amount = $match->exchangeRequest->amount;
        $match->exchangeOffer->save();
    }

    public static function createRequestFromRemainingAmount(MaterialMatch $match)
    {
        $newAmount = (int) $match->exchangeRequest->amount - (int) $match->exchangeOffer->amount;
        $newRequest = $match->exchangeRequest->replicate()->fill([
            'amount' => $newAmount
        ]);
        $newRequest->save();
        $match->exchangeRequest->amount = $match->exchangeOffer->amount;
        $match->exchangeRequest->save();
    }

    public static function create($offerId, $requestId)
    {
        $match = new MaterialMatch();
        $match->exchange_offer_id = $offerId;
        $match->exchange_request_id = $requestId;
        $match->save();

        self::convertRemainsToNewMaterial($match);

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
