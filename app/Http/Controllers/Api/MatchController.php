<?php

namespace App\Http\Controllers\Api;

use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Mail\Admin\AdminMatchMadeEmail;
use App\Mail\MatchApprovedEmail;
use App\Mail\MatchCancelledEmail;
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
        if (!empty($match->offer->organs) && !empty($match->request->organs) && $match->offer->organs != $match->request->organs) {
            return self::createNewFromRemainingOrgans($match);
        } elseif ((int) $match->offer->amount > (int) $match->request->amount) {
            return self::createOfferFromRemainingAmount($match);
        } elseif ((int) $match->request->amount > (int) $match->offer->amount) {
            return self::createRequestFromRemainingAmount($match);
        }
    }

    public static function createNewFromRemainingOrgans(MaterialMatch $match)
    {
        $offerOrgansArray = explode(', ', $match->offer->organs);
        sort($offerOrgansArray);
        $requestOrgansArray = explode(', ', $match->request->organs);
        sort($requestOrgansArray);

        if ($offerOrgansArray === $requestOrgansArray) {
            if ((int) $match->offer->amount > (int) $match->request->amount) {
                return self::createOfferFromRemainingAmount($match);
            } elseif ((int) $match->request->amount > (int) $match->offer->amount) {
                return self::createRequestFromRemainingAmount($match);
            }
        }

        $overlappingOrgans = array_intersect($offerOrgansArray, $requestOrgansArray);
        $matchAmount = self::calculateCorrectMatchAmount($match);

        $remainingOfferOrgans = array_diff($offerOrgansArray, $overlappingOrgans);
        if (count($remainingOfferOrgans) > 0) {
            $newOffer = $match->offer->replicate()->fill([
                'organs' => implode(', ', $remainingOfferOrgans),
                'origin_id' => $match->offer->id
            ]);
            $newOffer->save();
        }
        if (count($overlappingOrgans) > 0 && $match->offer->amount > $matchAmount) {
            $newOffer = $match->offer->replicate()->fill([
                'organs' => implode(', ', $overlappingOrgans),
                'amount' => (int) $match->offer->amount - $matchAmount,
                'origin_id' => $match->offer->id
            ]);
            $newOffer->save();
        }


        $remainingRequestOrgans = array_diff($requestOrgansArray, $overlappingOrgans);
        if (count($remainingRequestOrgans) > 0) {
            $newRequest = $match->request->replicate()->fill([
                'organs' => implode(', ', $remainingRequestOrgans),
                'origin_id' => $match->request->id
            ]);
            $newRequest->save();
        }
        if (count($overlappingOrgans) > 0 && $match->request->amount > $matchAmount) {
            $newRequest = $match->request->replicate()->fill([
                'organs' => implode(', ', $overlappingOrgans),
                'amount' => (int) $match->request->amount - $matchAmount,
                'origin_id' => $match->request->id
            ]);
            $newRequest->save();
        }

        $matchOffer = $match->offer->replicate()->fill([
            'organs' => implode(', ', $overlappingOrgans),
            'amount' => $matchAmount,
            'origin_id' => $match->offer->id
        ]);
        $matchOffer->save();

        $match->offer->active = false;
        $match->offer->save();

        $matchRequest = $match->request->replicate()->fill([
            'organs' => implode(', ', $overlappingOrgans),
            'amount' => $matchAmount,
            'origin_id' => $match->request->id
        ]);
        $matchRequest->save();

        $match->request->active = false;
        $match->request->save();

        return ["exchange_offer_match_id" => $matchOffer->id, "exchange_request_match_id" => $matchRequest->id];
    }

    public static function calculateCorrectMatchAmount(MaterialMatch $match)
    {
        if ((int) $match->offer->amount > (int) $match->request->amount) {
            return $match->request->amount;
        } else {
            return $match->offer->amount;
        }
    }

    public static function createOfferFromRemainingAmount(MaterialMatch $match)
    {
        $newAmount = (int) $match->offer->amount - (int) $match->request->amount;
        $newOffer = $match->offer->replicate()->fill([
            'amount' => $newAmount,
            'origin_id' => $match->offer->id
        ]);
        $newOffer->save();

        $matchOffer = $match->offer->replicate()->fill([
            'amount' => $match->request->amount,
            'origin_id' => $match->offer->id
        ]);
        $matchOffer->save();

        $match->offer->active = false;
        $match->offer->save();

        return ["exchange_offer_match_id" => $matchOffer->id, "exchange_request_match_id" => $match->request->id];
    }

    public static function createRequestFromRemainingAmount(MaterialMatch $match)
    {
        $newAmount = (int) $match->request->amount - (int) $match->offer->amount;
        $newRequest = $match->request->replicate()->fill([
            'amount' => $newAmount,
            'origin_id' => $match->request->id
        ]);
        $newRequest->save();

        $matchRequest = $match->request->replicate()->fill([
            'amount' => $match->offer->amount,
            'origin_id' => $match->request->id
        ]);
        $matchRequest->save();

        $match->request->active = false;
        $match->request->save();

        return ["exchange_offer_match_id" => $match->offer->id, "exchange_request_match_id" => $matchRequest->id];
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

        self::handleMadeMatchValidation($match);
        self::deactivateActiveMatch($match);

        return $match;
    }

    public static function handleMadeMatchValidation(MaterialMatch $match)
    {
        $isConserved = $match->offer->type === 'conserved_tissue';

        if ($isConserved) {
            self::approve($match->id);
        } else {
            $admins = User::whereIsAdmin()->get();
            foreach ($admins as $admin) {
                Mail::to($admin)->queue(new AdminMatchMadeEmail($match, $admin));
            }
        }
    }

    public static function deactivateActiveMatch(MaterialMatch $match)
    {
        $updatedMatch = $match->fresh();
        $updatedMatch->exchangeOffer->active = false;
        $updatedMatch->exchangeOffer->save();

        $updatedMatch->exchangeRequest->active = false;
        $updatedMatch->exchangeRequest->save();
    }

    public static function approve(int $matchId)
    {
        $match = MaterialMatch::find($matchId);
        if (!$match) {
            return response()->json(["success" => false, "message" => "Match does not exist"]);
        }
        $match->awaiting_approval = false;
        $match->approved = true;
        $match->save();

        Mail::to($match->offer->user)->queue(new MatchApprovedEmail($match, $match->offer->user));
        Mail::to($match->request->user)->queue(new MatchApprovedEmail($match, $match->request->user));

        return response()->json(["success" => true]);
    }

    public function restoreOrigin(MaterialMatch $match)
    {
        if (!empty($match->offer->origin_id)) {
            $origin = ExchangeOffer::find($match->offer->origin_id);
            $origin->active = true;
            $origin->save();

            ExchangeOffer::where('origin_id', $match->offer->origin_id)->get()->each(function ($offer) {
                $offer->delete();
            });
        } else {
            $match->offer->active = true;
            $match->offer->save();
        }

        if (!empty($match->request->origin_id)) {
            $origin = ExchangeRequest::find($match->request->origin_id);
            $origin->active = true;
            $origin->save();

            ExchangeRequest::where('origin_id', $match->request->origin_id)->get()->each(function ($exchangeRequest) {
                $exchangeRequest->delete();
            });
        } else {
            $match->request->active = true;
            $match->request->save();
        }
    }

    public function cancel(Request $request, int $matchId)
    {
        $match = MaterialMatch::find($matchId);
        if (!$match) {
            return response()->json(["success" => false, "message" => "Match does not exist"]);
        }
        if ($request->user()->id != $match->offer->user->id && $request->user()->id != $match->request->user->id) {
            return response()->json(["success" => false, "message" => "You have no connection to this match"]);
        }

        $this->restoreOrigin($match);

        Mail::to($match->offer->user)->queue(new MatchCancelledEmail($match->offer->user));
        Mail::to($match->request->user)->queue(new MatchCancelledEmail($match->request->user));

        $match->delete();

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

        $this->restoreOrigin($match);

        Mail::to($match->offer->user)->queue(new MatchDeclinedEmail($match, $match->offer->user));
        Mail::to($match->request->user)->queue(new MatchDeclinedEmail($match, $match->request->user));

        return response()->json(["success" => true]);
    }
}
