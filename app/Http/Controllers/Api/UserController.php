<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Auth\LoginController;
use App\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
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
        LoginController::logUserIn($user, $request->password);

        return response()->json(["success" => true, "user" => $request->user()]);
    }

    public function resetPassword(Request $request)
    {

        $user = User::where('email', $request->email)->first();

        if (!empty($user)) {
            Password::sendResetLink(
                $request->only('email')
            );
        }

        return response()->json(["success" => true]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(["success" => true])
            : response()->json(["success" => false]);
    }

    public function delete($user_id)
    {
        $user = User::find($user_id);
        $user->delete();

        return response()->json(["success" => true]);
    }
}
