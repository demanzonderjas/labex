<?php

namespace App\Http\Controllers\Api;

use App\Alert;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AlertController extends Controller
{
	public function store(Request $request)
	{
		$alert = new Alert();
		$alert->user_id = $request->user()->id;
		$alert->specifications = $request->specifications;
		$alert->save();

		return response()->json(["success" => true, "alert" => $alert->toArray()]);
	}

	public function getMine(Request $request)
	{
		$alerts = Alert::where(['user_id' => $request->user()->id])->get();
		return response()->json(["success" => true, "alerts" => $alerts->toArray()]);
	}

	public function all()
	{
		$alerts = Alert::with('user')->orderBy('user_id')->get();

		return response()->json(["success" => true, "alerts" => $alerts]);
	}

	public function delete(Request $request, $alert_id)
	{
		$alert = Alert::findOrFail($alert_id);

		if ($request->user()->id !== $alert->user->id) {
			return response()->json(["success" => false, "message" => "You have no connection to this alert"]);
		}

		$alert->delete();

		return response()->json(["success" => true]);
	}
}
