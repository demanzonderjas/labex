<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\Admin\AdminSignUpEmail;
use App\Signup;
use App\User;
use App\Mail\SignupApprovedEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SignupController extends Controller
{
    public function store(Request $request)
    {
        $signup = new Signup($request->all());
        $signup->save();

        $admins = User::whereIsAdmin()->get();
        foreach ($admins as $admin) {
            Mail::to($admin)->queue(new AdminSignUpEmail($signup));
        }

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
        $signup->approved = true;
        $signup->save();

        Mail::to($signup)->queue(new SignupApprovedEmail($signup));

        return response()->json(["success" => true]);
    }

    public function decline($signupId)
    {
        $signup = Signup::find($signupId);
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
