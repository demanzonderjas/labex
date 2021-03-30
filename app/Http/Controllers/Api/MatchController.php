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
        if (!empty($match->exchangeOffer->organs) && !empty($match->exchangeRequest->organs) && $match->exchangeOffer->organs != $match->exchangeRequest->organs) {
            return self::createNewFromRemainingOrgans($match);
        } elseif ((int) $match->exchangeOffer->amount > (int) $match->exchangeRequest->amount) {
            return self::createOfferFromRemainingAmount($match);
        } elseif ((int) $match->exchangeRequest->amount > (int) $match->exchangeOffer->amount) {
            return self::createRequestFromRemainingAmount($match);
        }
    }

    public static function createNewFromRemainingOrgans(MaterialMatch $match)
    {
        $offerOrgansArray = explode(', ', $match->exchangeOffer->organs);
        sort($offerOrgansArray);
        $requestOrgansArray = explode(', ', $match->exchangeRequest->organs);
        sort($requestOrgansArray);

        if ($offerOrgansArray === $requestOrgansArray) {
            if ((int) $match->exchangeOffer->amount > (int) $match->exchangeRequest->amount) {
                return self::createOfferFromRemainingAmount($match);
            } elseif ((int) $match->exchangeRequest->amount > (int) $match->exchangeOffer->amount) {
                return self::createRequestFromRemainingAmount($match);
            }
        }

        $overlappingOrgans = array_intersect($offerOrgansArray, $requestOrgansArray);
        $matchAmount = self::calculateCorrectMatchAmount($match);

        $remainingOfferOrgans = array_diff($offerOrgansArray, $overlappingOrgans);
        if (count($remainingOfferOrgans) > 0) {
            $newOffer = $match->exchangeOffer->replicate()->fill([
                'organs' => implode(', ', $remainingOfferOrgans),
                'origin_id' => $match->exchangeOffer->id
            ]);
            $newOffer->save();
        }
        if (count($overlappingOrgans) > 0 && $match->exchangeOffer->amount > $matchAmount) {
            $newOffer = $match->exchangeOffer->replicate()->fill([
                'organs' => implode(', ', $overlappingOrgans),
                'amount' => (int) $match->exchangeOffer->amount - $matchAmount,
                'origin_id' => $match->exchangeOffer->id
            ]);
            $newOffer->save();
        }


        $remainingRequestOrgans = array_diff($requestOrgansArray, $overlappingOrgans);
        if (count($remainingRequestOrgans) > 0) {
            $newRequest = $match->exchangeRequest->replicate()->fill([
                'organs' => implode(', ', $remainingRequestOrgans),
                'origin_id' => $match->exchangeRequest->id
            ]);
            $newRequest->save();
        }
        if (count($overlappingOrgans) > 0 && $match->exchangeRequest->amount > $matchAmount) {
            $newRequest = $match->exchangeRequest->replicate()->fill([
                'organs' => implode(', ', $overlappingOrgans),
                'amount' => (int) $match->exchangeRequest->amount - $matchAmount,
                'origin_id' => $match->exchangeRequest->id
            ]);
            $newRequest->save();
        }

        $matchOffer = $match->exchangeOffer->replicate()->fill([
            'organs' => implode(', ', $overlappingOrgans),
            'amount' => $matchAmount,
            'origin_id' => $match->exchangeOffer->id
        ]);
        $matchOffer->save();

        $match->exchangeOffer->active = false;
        $match->exchangeOffer->save();

        $matchRequest = $match->exchangeRequest->replicate()->fill([
            'organs' => implode(', ', $overlappingOrgans),
            'amount' => $matchAmount,
            'origin_id' => $match->exchangeRequest->id
        ]);
        $matchRequest->save();

        $match->exchangeRequest->active = false;
        $match->exchangeRequest->save();

        return ["exchange_offer_match_id" => $matchOffer->id, "exchange_request_match_id" => $matchRequest->id];
    }

    public static function calculateCorrectMatchAmount(MaterialMatch $match)
    {
        if ((int) $match->exchangeOffer->amount > (int) $match->exchangeRequest->amount) {
            return $match->exchangeRequest->amount;
        } else {
            return $match->exchangeOffer->amount;
        }
    }

    public static function createOfferFromRemainingAmount(MaterialMatch $match)
    {
        $newAmount = (int) $match->exchangeOffer->amount - (int) $match->exchangeRequest->amount;
        $newOffer = $match->exchangeOffer->replicate()->fill([
            'amount' => $newAmount,
            'origin_id' => $match->exchangeOffer->id
        ]);
        $newOffer->save();

        $matchOffer = $match->exchangeOffer->replicate()->fill([
            'amount' => $match->exchangeRequest->amount,
            'origin_id' => $match->exchangeOffer->id
        ]);
        $matchOffer->save();

        $match->exchangeOffer->active = false;
        $match->exchangeOffer->save();

        return ["exchange_offer_match_id" => $matchOffer->id, "exchange_request_match_id" => $match->exchangeRequest->id];
    }

    public static function createRequestFromRemainingAmount(MaterialMatch $match)
    {
        $newAmount = (int) $match->exchangeRequest->amount - (int) $match->exchangeOffer->amount;
        $newRequest = $match->exchangeRequest->replicate()->fill([
            'amount' => $newAmount,
            'origin_id' => $match->exchangeRequest->id
        ]);
        $newRequest->save();

        $matchRequest = $match->exchangeRequest->replicate()->fill([
            'amount' => $match->exchangeOffer->amount,
            'origin_id' => $match->exchangeRequest->id
        ]);
        $matchRequest->save();

        $match->exchangeRequest->active = false;
        $match->exchangeRequest->save();

        return ["exchange_offer_match_id" => $match->exchangeOffer->id, "exchange_request_match_id" => $matchRequest->id];
    }

    public static function create($offerId, $requestId)
    {
        $match = new MaterialMatch();
        $match->exchange_offer_id = $offerId;
        $match->exchange_request_id = $requestId;
        $match->save();

        $matchingIds = self::convertRemainsToNewMaterial($match);

        $match->exchange_offer_id = $matchingIds["exchange_offer_match_id"];
        $match->exchange_request_id = $matchingIds["exchange_request_match_id"];
        $match->save();

        $offer = ExchangeOffer::find($matchingIds["exchange_offer_match_id"]);
        $request = ExchangeRequest::find($matchingIds["exchange_request_match_id"]);
        Mail::to($offer->user)->queue(new MatchMadeEmail($match, $offer->user));
        Mail::to($request->user)->queue(new MatchMadeEmail($match, $request->user));

        $admins = User::whereIsAdmin()->get();
        foreach ($admins as $admin) {
            Mail::to($admin)->queue(new AdminMatchMadeEmail($match, $admin));
        }

        self::deactivateActiveMatch($match);

        return $match;
    }

    public static function deactivateActiveMatch(MaterialMatch $match)
    {
        $updatedMatch = $match->fresh();
        $updatedMatch->exchangeOffer->active = false;
        $updatedMatch->exchangeOffer->save();

        $updatedMatch->exchangeRequest->active = false;
        $updatedMatch->exchangeRequest->save();
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
