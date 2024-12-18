<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Auth\Events\Registered;
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
        $allowedDomains = config('validation.allowed_domains');
        $domain = explode('@', $request->email)[1];
        if (array_search($domain, $allowedDomains) === false) {
            return response()->json(["success" => false, "message" => "your_organisation_does_not_have_access"]);
        }
        if (User::where('email', $request->email)->first()) {
            return response()->json(["success" => false, "message" => "email_already_exists"]);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->token = Str::random(40);
        $user->password = Hash::make($request->password);
        $user->save();

        event(new Registered($user));

        return response()->json(["success" => true, "user" => $request->user()]);
    }

    public function delete($user_id)
    {
        User::destroy($user_id);

        return response()->json(["success" => true]);
    }
}
