<?php

namespace App\Http\Controllers\Api;

use App\Alert;
use App\ExchangeAttempt;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExchangeAttemptStoreRequest;
use App\Http\Resources\ExchangeAttemptResource;
use App\Mail\Admin\AdminOfferAddedEmail;
use App\Mail\AlertMatchEmail;
use App\Role;
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
			$isOffer = $request->attempt_type == config('atex.constants.offer');

			// if ($isOffer && !$request->user()->canAddContent()) {
			// 	return response()->json(["success" => false, "message" => "you_are_not_allowed_to_add_content"]);
			// }

			$validated = $request->validated();
			$attempt = $this->saveInDb($request, $validated, $request->attempt_type);

			if ($isOffer) {
				$admins = User::where('is_admin', true)->get();
				foreach ($admins as $admin) {
					Mail::to($admin)->queue(new AdminOfferAddedEmail($attempt));
				}
			}
			self::activateAlerts($attempt);

			return response()->json(["success" => true, "exchange_attempt" => new ExchangeAttemptResource($attempt)]);
		} catch (Exception $e) {
			return response()->json(["success" => false, "error" => $request->validated()]);
		}
	}

	public function approve(ExchangeAttempt $attempt)
	{
		$attempt->status = 'active';
		$attempt->save();
		return response()->json(["success" => true]);
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
			? ExchangeAttempt::where(['attempt_type' => $request->attempt_type])->with('user')->get()
			: ExchangeAttempt::doesntHave($matchType)
			->where(['status' => config('atex.constants.exchange_attempt_status.active'), 'attempt_type' => $request->attempt_type])
			->get();
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
