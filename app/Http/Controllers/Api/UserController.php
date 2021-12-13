<?php

namespace App\Http\Controllers\Api;

use App\Signup;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController
{

    public function getActiveUser(Request $request)
    {
        return response()->json(["success" => true, "user" => $request->user()]);
    }

    public function getAll()
    {
        $users = User::where('is_admin', false)->get();
        return response()->json(["success" => true, "users" => $users->toArray()]);
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->token = Str::random(40);
        $user->password = Hash::make($request->password);
        $user->organisation = $request->organisation;
        $user->save();

        $signup = new Signup();
        $signup->name = $request->name;
        $signup->email = $request->email;
        $signup->awaiting_approval = false;
        $signup->approved = true;
        $signup->save();

        return response()->json(["success" => true, "user" => $request->user()]);
    }

    public function delete($user_id)
    {
        User::destroy($user_id);

        return response()->json(["success" => true]);
    }
}
