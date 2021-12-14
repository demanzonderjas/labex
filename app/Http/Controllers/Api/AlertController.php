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

	public function delete($alert_id)
	{
		Alert::destroy($alert_id);

		return response()->json(["success" => true]);
	}
}
