<?php

namespace App\Http\Controllers\Api;

use App\ExchangeAttempt;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdoptionInfoController extends Controller
{

	public function update(ExchangeAttempt $offer, Request $request)
	{
		$offer->adoptionInfo->code = $request->adoption_code;
		$offer->adoptionInfo->amount = $request->adoption_amount;
		$offer->adoptionInfo->save();

		return response()->json(["success" => true]);
	}
}
