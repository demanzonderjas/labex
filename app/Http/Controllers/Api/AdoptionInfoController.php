<?php

namespace App\Http\Controllers\Api;

use App\AdoptionInfo;
use App\ExchangeAttempt;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdoptionInfoController extends Controller
{

	public function update(ExchangeAttempt $offer, Request $request)
	{
		$adoptionInfo = AdoptionInfo::firstOrNew([
			"offer_id" => $offer->id
		]);

		$adoptionInfo->code = $request->adoption_code;
		$adoptionInfo->amount = $request->adoption_amount;
		$adoptionInfo->save();

		if ($request->status === "no" || $adoptionInfo->amount == $offer->amount) {
			$offer->status = "inactive";
		} else if ($request->status === "yes") {
			$offer->status = "active";
		}
		$offer->save();

		return response()->json(["success" => true]);
	}
}
