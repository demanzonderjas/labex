<?php

namespace App\Http\Controllers\Api;

use App\ExchangeAttempt;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeAttemptStoreRequest;
use App\Mail\Admin\AdminOfferAddedEmail;
use App\Specification;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ExchangeAttemptController extends Controller
{
	public function store(ExchangeAttemptStoreRequest $request)
	{
		try {
			$validated = $request->validated();
			$attempt = $this->saveInDb($request, $validated, $request->attempt_type);

			if ($request->attempt_type == config('atex.constants.offer')) {
				$admin = User::where('email', env('ADMIN_MAIL'))->first();
				Mail::to($admin)->queue(new AdminOfferAddedEmail($attempt));
			}

			return response()->json(["success" => true, "exchange_attempt" => $attempt->toArray()]);
		} catch (Exception $e) {
			return response()->json(["success" => false, "error" => $validated]);
		}
	}

	public function getMyLatest(Request $request)
	{
		$exchange_attempts = ExchangeAttempt::where([
			'user_id' => $request->user()->id
		])->latest()->get();

		return response()->json(["success" => true, "exchange_attempts" => $exchange_attempts]);
	}

	public function deleteById($id)
	{
		$attempt = ExchangeAttempt::findOrFail($id);
		$attempt->delete();
		return response()->json(["success" => true, "exchange_attempt" => $attempt->toArray()]);
	}

	public function getById($id)
	{
		$attempt = ExchangeAttempt::with('user')->where(['id' => $id])->firstOrFail();
		return response()->json(["success" => true, "exchange_attempt" => $attempt->toArray()]);
	}

	public function getAll(Request $request)
	{
		$matchType = $request->attempt_type === config('atex.constants.offer') ? "matchViaOffer" : "matchViaRequest";
		$exchange_attempts = ExchangeAttempt::doesntHave($matchType)->where(['status' => config('atex.constants.exchange_attempt_status.active'), 'attempt_type' => $request->attempt_type])->get();
		return response()->json(["success" => true, "exchange_attempts" => $exchange_attempts->toArray()]);
	}

	public function saveInDb(Request $request, $specifications, $attempt_type)
	{
		$attempt = new ExchangeAttempt;
		$attempt->attempt_type = $attempt_type;
		$attempt->status = config('atex.constants.exchange_attempt_status.active');
		$attempt->user_id = $request->user()->id;
		$attempt->save();

		$specs = [];
		foreach ($specifications as $fieldId => $value) {
			if ($value !== null && $value !== "") {
				$specs[] = new Specification([
					'key' => $fieldId,
					'value' => $value
				]);
			}
		}
		$attempt->specifications()->saveMany($specs);
		return $attempt;
	}

	public function match(Request $request, $id)
	{
		$attempt = ExchangeAttempt::findOrFail($id);
		$matchingAttempt = $this->saveInDb($request, $request->exchange_attempt, $request->exchange_attempt["attempt_type"]);
		$match = MatchController::create($attempt->id, $matchingAttempt->id);

		return response()->json(["success" => true, "match" => $match->toArray()]);
	}
}
