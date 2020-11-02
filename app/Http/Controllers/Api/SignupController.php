<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Signup;
use Illuminate\Http\Request;

class SignupController extends Controller
{
    public function store(Request $request)
    {
        $signup = new Signup($request->all());
        $signup->save();

        return response()->json(["success" => true]);
    }

    public function getAll()
    {
        $signups = Signup::all();
        return response()->json(["success" => true, "signups" => $signups->toArray()]);
    }

    public function approve($signupId)
    {
        $signup = Signup::find($signupId);
        $signup->awaiting_approval = false;
        $signup->approved = true;
        $signup->save();

        return response()->json(["success" => true]);
    }

    public function decline($signupId)
    {
        $signup = Signup::find($signupId);
        $signup->awaiting_approval = false;
        $signup->approved = false;
        $signup->save();

        return response()->json(["success" => true]);
    }

    public function delete($signupId)
    {
        $signup = Signup::find($signupId);
        $signup->delete();

        return response()->json(["success" => true]);
    }
}
