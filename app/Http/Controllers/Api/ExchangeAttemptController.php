<?php

namespace App\Http\Controllers\Api;

use App\Alert;
use App\ExchangeAttempt;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeAttemptStoreRequest;
use App\Http\Resources\ExchangeAttemptResource;
use App\Mail\Admin\AdminOfferAddedEmail;
use App\Mail\AlertMatchEmail;
use App\Mail\AttemptAddedEmail;
use App\Specification;
use App\User;
use Carbon\Carbon;
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
			Mail::to($attempt->user)->queue(new AttemptAddedEmail($attempt, $attempt->user));

			if ($request->attempt_type == config('atex.constants.offer')) {
				$admin = User::whereUserGetsOrganisationAdminEmail([$attempt->user->organisation])->get();
				Mail::to($admin)->queue(new AdminOfferAddedEmail($attempt));
			}
			self::activateAlerts($attempt);
			self::checkForMatchInSystem($attempt);

			return response()->json(["success" => true, "exchange_attempt" => new ExchangeAttemptResource($attempt)]);
		} catch (Exception $e) {
			return response()->json(["success" => false, "error" => $e, "validated" => $validated]);
		}
	}

	public function update(ExchangeAttemptStoreRequest $request, $attempt_id)
	{
		try {
			$validated = $request->validated();
			$attempt = $this->updateInDb($attempt_id, $validated);

			return response()->json(["success" => true, "exchange_attempt" => new ExchangeAttemptResource($attempt)]);
		} catch (Exception $e) {
			return response()->json(["success" => false, "error" => $validated]);
		}
	}

	public function getMyLatest(Request $request)
	{
		$exchange_attempts = ExchangeAttempt::where([
			'user_id' => $request->user()->id
		])->latest()->get();

		return response()->json(["success" => true, "exchange_attempts" => ExchangeAttemptResource::collection($exchange_attempts)]);
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


		$exchange_attempts = $request->admin_view
			? ExchangeAttempt::whereActiveUserIsLocationAdmin()
			: ExchangeAttempt::doesntHave($matchType)->where(['status' => config('atex.constants.exchange_attempt_status.active'), 'attempt_type' => $request->attempt_type])->get();
		return response()->json(["success" => true, "exchange_attempts" => ExchangeAttemptResource::collection($exchange_attempts)]);
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
			$isMatch = array_reduce($alert->specifications, function ($base, $next) use ($alert, $attempt) {

				if ($base === false) {
					return $base;
				} else if ($next["key"] === "organs") {
					$alertOrgans = explode(", ", $next['value']);
					$attemptOrgans = !empty($attempt->organs) ? explode(", ", $attempt->organs) : [];
					$hasOverlap = count(array_intersect($alertOrgans, $attemptOrgans)) > 0;
					return $hasOverlap;
				} else if ($next["key"] === "age_type" && $attempt->attempt_type === config('atex.constants.offer')) {
					$minAge = Carbon::createFromFormat("Y-m-d", $attempt->getSpec("age"));
					$minAge->add($alert->getSpec("age_min"), $alert->getSpec("age_type"));
					$maxAge = Carbon::createFromFormat("Y-m-d", $attempt->getSpec("age"));
					$maxAge->add($alert->getSpec("age_max"), $alert->getSpec("age_type"));
					$now = Carbon::now();
					return $now->isAfter($minAge) && $now->isBefore($maxAge);
				} else if ($next["key"] === "age_type" && $attempt->attempt_type === config('atex.constants.request')) {
					if (!$attempt->getSpec("age_type")) {
						return $base;
					}
					$dayMultiplierAttempt = config('atex.constants.days_per_period.' . $attempt->getSpec("age_type"));
					$minDaysAttempt = $dayMultiplierAttempt * $attempt->getSpec("age_min");
					$maxDaysAttempt = $dayMultiplierAttempt * $attempt->getSpec("age_max");

					$dayMultiplierAlert = config('atex.constants.days_per_period.' . $alert->getSpec("age_type"));
					$minDaysAlert = $dayMultiplierAlert * $alert->getSpec("age_min");
					$maxDaysAlert = $dayMultiplierAlert * $alert->getSpec("age_max");

					return ($minDaysAlert > $minDaysAttempt && $minDaysAlert < $maxDaysAttempt) ||
						($minDaysAlert < $minDaysAttempt && $maxDaysAlert > $maxDaysAttempt) ||
						($minDaysAttempt > $minDaysAlert && $maxDaysAttempt < $maxDaysAlert) ||
						($maxDaysAlert < $maxDaysAttempt &&
							$minDaysAlert < $maxDaysAttempt &&
							$maxDaysAlert > $minDaysAttempt);
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

	public static function checkForMatchInSystem(ExchangeAttempt $newAttempt)
	{
		$possibleMatches = ExchangeAttempt::where('user_id', '!=', $newAttempt->user_id)->where('attempt_type', '!=', $newAttempt->attempt_type)->get();
		$matches = $possibleMatches->filter(function ($possibleMatch) use ($newAttempt) {
			$attemptToCheck = $newAttempt->attempt_type === "request" ? $newAttempt : $possibleMatch;
			$attemptToMatch = $newAttempt->attempt_type === "request" ? $possibleMatch : $newAttempt;

			return $attemptToCheck->specifications
				->filter(function ($checkSpec) {
					return $checkSpec->key !== "amount"
						&& $checkSpec->key !== "age_type"
						&& $checkSpec->key !== "age_min"
						&& $checkSpec->key !== "age_max";
				})
				->reduce(function ($base, $checkSpec) use ($attemptToMatch) {
					$matchSpec = $attemptToMatch->getSpec($checkSpec->key);
					if ($base === false || $checkSpec->key === "protocol_number") {
						return $base;
					} else if (empty($matchSpec)) {
						return false;
					} else if ($matchSpec !== $checkSpec->value) {
						return false;
					}

					return $base;
				}, true);
		});

		dd($matches);
	}
}
