<?php

namespace App\Http\Controllers\Api;

use App\ExchangeAttempt;
use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeAttemptStoreRequest;
use App\Specification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExchangeAttemptController extends Controller
{
	public function store(ExchangeAttemptStoreRequest $request)
	{
		try {
			$validated = $request->validated();
			$exchange = new ExchangeAttempt;
			$exchange->attempt_type = $request->attempt_type;
			$exchange->status = config('atex.constants.active');
			$exchange->user_id = $request->user()->id;
			$exchange->save();

			$specs = [];
			foreach ($validated as $fieldId => $value) {
				$specs[] = new Specification([
					'key' => $fieldId,
					'value' => $value
				]);
			}
			$exchange->specifications()->saveMany($specs);

			return response()->json(["success" => true, "exchange" => $exchange->toArray()]);
		} catch (Exception $e) {
			return response()->json(["success" => false, "error" => $e]);
		}
	}

	public function getMyLatest(Request $request)
	{
		$offers = ExchangeAttempt::where(function ($query) use ($request) {
			$query->where(['user_id' => $request->user()->id, 'attempt_type' => $request->attempt_type]);
		})->latest()->get();

		return response()->json(["success" => true, "exchange_offers" => $offers]);
	}

	public function deleteById($id)
	{
		$exchange = ExchangeAttempt::findOrFail($id);
		$exchange->delete();
		return response()->json(["success" => true, "exchange" => $exchange->toArray()]);
	}

	public function getById($id)
	{
		$exchange = ExchangeAttempt::findOrFail($id);
		return response()->json(["success" => true, "exchange" => $exchange->toArray()]);
	}

	public function getAll(Request $request)
	{
		$exchanges = ExchangeAttempt::doesntHave('match')->where(['status' => config('atex.constants.active'), 'attempt_type' => $request->attempt_type])->get();
		return response()->json(["success" => true, "exchanges" => $exchanges->toArray()]);
	}

	public function match(Request $request, $id)
	{
		$offer = ExchangeOffer::findOrFail($id);
		$exchangeRequest = new ExchangeRequest($request->exchange_request);
		$exchangeRequest->user_id = Auth::user()->id;
		$exchangeRequest->save();

		$match = MatchController::create($offer->id, $exchangeRequest->id);

		return response()->json(["success" => true, "match" => $match->toArray()]);
	}
}
