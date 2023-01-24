<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\Admin\AdminSignUpEmail;
use App\Signup;
use App\User;
use App\Mail\SignupApprovedEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SignupController extends Controller
{
    public function store(Request $request)
    {
        $signup = new Signup($request->all());
        $signup->save();

        $admins = User::whereUserHasOrganisationAccess([$signup->organisation]);

        foreach ($admins as $admin) {
            Mail::to($admin)->queue(new AdminSignUpEmail($signup));
        }

        return response()->json(["success" => true]);
    }

    public function getAll()
    {
        $signups = Signup::whereUserIsOrganisationAdmin();
        return response()->json(["success" => true, "signups" => $signups->toArray()]);
    }

    public function approve($signupId)
    {
        $signup = Signup::find($signupId);
        $signup->awaiting_approval = false;
        $signup->approved = true;
        $signup->save();

        Mail::to($signup)->queue(new SignupApprovedEmail($signup));

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
