<?php

namespace App\Http\Controllers\Api;

use App\Alert;
use App\ExchangeAttempt;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeAttemptStoreRequest;
use App\Mail\Admin\AdminOfferAddedEmail;
use App\Mail\AlertMatchEmail;
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
			self::activateAlerts($attempt);

			return response()->json(["success" => true, "exchange_attempt" => $attempt->toArray()]);
		} catch (Exception $e) {
			dd($e);
			return response()->json(["success" => false, "error" => $validated]);
		}
	}

	public function update(ExchangeAttemptStoreRequest $request, $attempt_id)
	{
		try {
			$validated = $request->validated();
			$attempt = $this->updateInDb($attempt_id, $validated);

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
		ExchangeAttempt::destroy($id);
		return response()->json(["success" => true]);
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

	public function updateInDb($attempt_id, $specifications)
	{
		$attempt = ExchangeAttempt::find($attempt_id);
		foreach ($specifications as $fieldId => $value) {
			if ($value !== null && $value !== "") {
				$spec = Specification::firstOrNew([
					'exchange_attempt_id' => $attempt_id,
					'key' => $fieldId,
				]);
				$spec->value = $value;
				$specs[] = $spec;
			}
		}
		$attempt->specifications()->saveMany($specs);
		return $attempt;
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

	public function match(Request $request, $attempt_id)
	{
		$attempt = ExchangeAttempt::findOrFail($attempt_id);
		$matchingAttempt = $this->saveInDb($request, $request->exchange_attempt, $request->exchange_attempt["attempt_type"]);
		$match = MatchController::create($attempt->id, $matchingAttempt->id);

		return response()->json(["success" => true, "match" => $match->toArray()]);
	}

	public static function activateAlerts(ExchangeAttempt $attempt)
	{
		$alerts = Alert::where('user_id', '!=', $attempt->user->id)->get();
		$matchingAlerts = $alerts->filter(function ($alert) use ($attempt) {
			if (!empty($alert->attempt_type) && $alert->attempt_type != $attempt->attempt_type) {
				return false;
			}
			$isMatch = array_reduce($alert->specifications, function ($base, $next) use ($attempt) {

				if ($base === false) {
					return $base;
				} else if ($next["key"] === "organs") {
					$alertOrgans = explode(", ", $next['value']);
					$attemptOrgans = !empty($attempt->organs) ? explode(", ", $attempt->organs) : [];
					$hasOverlap = count(array_intersect($alertOrgans, $attemptOrgans)) > 0;
					return $hasOverlap;
				} else if (strpos($next["key"], "age") === false && $next["key"] != "attempt_type") {
					$spec = $attempt->specifications->firstWhere('key', $next["key"]);
					$base = $spec ? $next["value"] === $spec->value : $base;
				}

				return $base;
			}, true);
			return $isMatch;
		});

		$usersMailed = [];

		foreach ($matchingAlerts as $alert) {
			if (!in_array($alert->user->id, $usersMailed)) {
				Mail::to($alert->user)->queue(new AlertMatchEmail($attempt));
			}
			array_push($usersMailed, $alert->user->id);
		}
	}
}
