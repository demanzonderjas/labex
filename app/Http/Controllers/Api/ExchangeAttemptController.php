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
			$exchange->status = config('atex.constants.exchange_attempt_status.active');
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

			return response()->json(["success" => true, "exchange_attempt" => $exchange->toArray()]);
		} catch (Exception $e) {
			return response()->json(["success" => false, "error" => $e]);
		}
	}

	public function getMyLatest(Request $request)
	{
		$attempts = ExchangeAttempt::where(function ($query) use ($request) {
			$query->where(['user_id' => $request->user()->id, 'attempt_type' => $request->attempt_type]);
		})->latest()->get();

		return response()->json(["success" => true, "exchange_attempts" => $attempts]);
	}

	public function deleteById($id)
	{
		$attempt = ExchangeAttempt::findOrFail($id);
		$attempt->delete();
		return response()->json(["success" => true, "exchange_attempt" => $attempt->toArray()]);
	}

	public function getById($id)
	{
		$attempt = ExchangeAttempt::findOrFail($id);
		return response()->json(["success" => true, "exchange_attempt" => $attempt->toArray()]);
	}

	public function getAll(Request $request)
	{
		$exchange_attempts = ExchangeAttempt::doesntHave('match')->where(['status' => config('atex.constants.exchange_attempt_status.active'), 'attempt_type' => $request->attempt_type])->get();
		return response()->json(["success" => true, "exchange_attempts" => $exchange_attempts->toArray()]);
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
