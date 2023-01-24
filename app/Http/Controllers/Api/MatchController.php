<?php

namespace App\Http\Controllers\Api;

use App\AdminAction;
use App\ExchangeAttempt;
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
        $matches = MaterialMatch::with('offer.user', 'request.user')->get();
        return response()->json(["success" => true, "matches" => $matches->toArray()]);
    }

    public function user(Request $request)
    {
        $matches = MaterialMatch::whereBelongsToUser($request->user())->with('offer.user', 'request.user')->get();

        return response()->json(["matches" => $matches->toArray()]);
    }

    public function myLatest(Request $request)
    {
        $match = MaterialMatch::whereBelongsToUser($request->user())->with('offer.user', 'request.user')->latest()->first();

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
        } else {
            return ["exchange_offer_match_id" => $match->offer_id, "exchange_request_match_id" => $match->request_id];
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
            $newOffer = $match->offer->replicate();
            $newOffer->organs = implode(', ', $remainingOfferOrgans);
            $newOffer->origin_id = $match->offer->id;
            $newOffer->save();
        }
        if (count($overlappingOrgans) > 0 && $match->offer->amount > $matchAmount) {
            $newOffer = $match->offer->replicate();
            $newOffer->organs = implode(', ', $overlappingOrgans);
            $newOffer->amount = (int) $match->offer->amount - $matchAmount;
            $newOffer->origin_id = $match->offer->id;
            $newOffer->save();
        }


        $remainingRequestOrgans = array_diff($requestOrgansArray, $overlappingOrgans);
        if (count($remainingRequestOrgans) > 0) {
            $newRequest = $match->request->replicate();
            $newRequest->organs = implode(', ', $remainingRequestOrgans);
            $newRequest->origin_id = $match->request->id;
            $newRequest->save();
        }
        if (count($overlappingOrgans) > 0 && $match->request->amount > $matchAmount) {
            $newRequest = $match->request->replicate();
            $newRequest->organs = implode(', ', $overlappingOrgans);
            $newRequest->amount = (int) $match->request->amount - $matchAmount;
            $newRequest->origin_id = $match->request->id;
            $newRequest->save();
        }

        $matchOffer = $match->offer->replicate();
        $matchOffer->organs = implode(', ', $overlappingOrgans);
        $matchOffer->amount = $matchAmount;
        $matchOffer->origin_id = $match->offer->id;
        $matchOffer->save();

        $match->offer->status = config('atex.constants.exchange_attempt_status.inactive');
        $match->offer->save();

        $matchRequest = $match->request->replicate();
        $matchRequest->organs = implode(', ', $overlappingOrgans);
        $matchRequest->amount = $matchAmount;
        $matchRequest->origin_id = $match->request->id;

        $matchRequest->save();

        $match->request->status = config('atex.constants.exchange_attempt_status.inactive');
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
        $newOffer = $match->offer->replicate();
        $newOffer->origin_id = $match->offer->id;
        $newOffer->amount = $newAmount;
        $newOffer->save();

        $matchOffer = $match->offer->replicate();
        $matchOffer->amount = $match->request->amount;
        $matchOffer->origin_id = $match->offer->id;
        $matchOffer->save();

        $match->offer->status = config('atex.constants.exchange_attempt_status.inactive');
        $match->offer->save();

        return ["exchange_offer_match_id" => $matchOffer->id, "exchange_request_match_id" => $match->request->id];
    }

    public static function createRequestFromRemainingAmount(MaterialMatch $match)
    {
        $newAmount = (int) $match->request->amount - (int) $match->offer->amount;
        $newRequest = $match->request->replicate();
        $newRequest->amount = $newAmount;
        $newRequest->origin_id = $match->request->id;
        $newRequest->save();

        $matchRequest = $match->request->replicate();
        $matchRequest->amount = $match->offer->amount;
        $matchRequest->origin_id = $match->request->id;
        $matchRequest->save();

        $match->request->status = config('atex.constants.exchange_attempt_status.inactive');
        $match->request->save();

        return ["exchange_offer_match_id" => $match->offer->id, "exchange_request_match_id" => $matchRequest->id];
    }

    public static function create($offerId, $requestId)
    {
        $match = new MaterialMatch();
        $match->offer_id = $offerId;
        $match->request_id = $requestId;
        $match->status = config('atex.constants.match_status.awaiting_approval');
        $match->save();

        $matchingIds = self::convertRemainsToNewMaterial($match);

        $match->offer_id = $matchingIds["exchange_offer_match_id"];
        $match->request_id = $matchingIds["exchange_request_match_id"];
        $match->save();

        $offer = ExchangeAttempt::find($matchingIds["exchange_offer_match_id"]);
        $request = ExchangeAttempt::find($matchingIds["exchange_request_match_id"]);
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
            self::approve($match->id, "");
        } else {
            $admins = User::whereUserHasOrganisationAccess([$match->offer->user->organisation, $match->request->user->organisation]);
            dd($admins);
            foreach ($admins as $admin) {
                Mail::to($admin)->queue(new AdminMatchMadeEmail($match, $admin));
            }
        }
    }

    public static function deactivateActiveMatch(MaterialMatch $match)
    {
        $updatedMatch = $match->fresh();
        $updatedMatch->offer->status = config('atex.constants.exchange_attempt_status.inactive');
        $updatedMatch->offer->save();

        $updatedMatch->request->status = config('atex.constants.exchange_attempt_status.inactive');
        $updatedMatch->request->save();
    }

    public static function approve(int $matchId, $message = "")
    {
        $match = MaterialMatch::find($matchId);
        if (!$match) {
            return response()->json(["success" => false, "message" => "Match does not exist"]);
        }
        $match->status = config('atex.constants.match_status.approved');
        $match->save();

        self::addAdminAction($match, "approve_match", $message);

        Mail::to($match->offer->user)->queue(new MatchApprovedEmail($match, $match->offer->user, $message));
        Mail::to($match->request->user)->queue(new MatchApprovedEmail($match, $match->request->user, $message));

        return response()->json(["success" => true]);
    }

    public function approveWithMessage(int $matchId, Request $request)
    {
        return self::approve($matchId, $request->message ?? "");
    }

    public function restoreOrigin(MaterialMatch $match)
    {
        if (!empty($match->offer->origin_id)) {
            $origin = ExchangeAttempt::find($match->offer->origin_id);
            $origin->status = config('atex.constants.exchange_attempt_status.active');
            $origin->save();

            $match->offer_id = $origin->id;
            $match->save();

            ExchangeAttempt::where('origin_id', $match->offer->origin_id)->get()->each(function ($offer) {
                $offer->delete();
            });
        } else {
            $match->offer->status = config('atex.constants.exchange_attempt_status.active');
            $match->offer->save();
        }

        if (!empty($match->request->origin_id)) {
            $origin = ExchangeAttempt::find($match->request->origin_id);
            $origin->status = config('atex.constants.exchange_attempt_status.active');
            $origin->save();

            $match->request_id = $origin->id;
            $match->save();

            ExchangeAttempt::where('origin_id', $match->request->origin_id)->get()->each(function ($exchangeRequest) {
                $exchangeRequest->delete();
            });
        } else {
            $match->request->status = config('atex.constants.exchange_attempt_status.active');
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

    public function reject(MaterialMatch $match, Request $request)
    {
        $match->status = config('atex.constants.match_status.rejected');
        $match->save();

        $this->restoreOrigin($match);

        self::addAdminAction($match, "reject_match", $request->message);

        Mail::to($match->offer->user)->queue(new MatchDeclinedEmail($match, $match->offer->user, $request->message));
        Mail::to($match->request->user)->queue(new MatchDeclinedEmail($match, $match->request->user, $request->message));

        return response()->json(["success" => true]);
    }

    public function updateAmount(MaterialMatch $match, Request $request)
    {
        $match->offer->amount = $request->amount;
        $match->request->amount = $request->amount;
        $match->offer->save();
        $match->request->save();
        return response()->json(["success" => true, "match" => $match]);
    }

    public static function addAdminAction(MaterialMatch $match, $action, $message)
    {
        $adminAction = new AdminAction();
        $adminAction->match_id = $match->id;
        $adminAction->action = $action;
        $adminAction->message = $message;
        $adminAction->save();
    }
}
