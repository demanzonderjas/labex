<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Signup;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function redirectToProvider(Request $request)
    {
        $request->session()->put('target_url', urldecode($request->query('target_url')));
        if (env('APP_ENV') !== "production") {
            $user = User::where('email', 'demo@labexplatform.nl')->first();
            Auth::login($user);
            return $this->redirectToCorrectUrl($request);
        }
        return Socialite::driver('surfconext')->redirect();
    }

    public function redirectToCorrectUrl(Request $request)
    {
        $redirectUrl = $request->session()->get('target_url');
        $targetUrl = !empty($redirectUrl) ? $redirectUrl : "/app/dashboard";
        return redirect()->to($targetUrl);
    }

    public function handleProviderCallback(Request $request)
    {
        try {
            $ssoUser = Socialite::driver('surfconext')->user();
            $existingUser = User::where('email', $ssoUser->email)->first();
            if ($existingUser !== null) {
                Auth::login($existingUser);
            } else {
                $u = $this->createNewUser($ssoUser);
                Auth::login($u);
            }
            return $this->redirectToCorrectUrl($request);
        } catch (Exception $e) {
            abort(403, $e->getMessage());
        }
    }

    public function handleExternalLogin(Request $request)
    {
        try {
            $user = User::where('email', $request->email)->firstOrFail();
        } catch (Exception $e) {
            return response()->json(["success" => false, "message" => "Credentials given are not correct"]);
        }
        $isCorrect = Hash::check($request->password, $user->password);

        if ($isCorrect) {
            Auth::login($user);
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false, "message" => "Credentials given are not correct"]);
        }
    }

    public function handleDemoLogin(Request $request)
    {
        if ($request->password === 'demolab') {
            Auth::login(User::find($request->user_id));
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false, "message" => "Credentials given are not correct"]);
        }
    }

    public function createNewUser($ssoUser): User
    {
        $u = new User();
        $u->email = $ssoUser->email;
        $u->name =  $ssoUser->name;
        $u->token = Str::random(40);
        $u->organisation = $ssoUser->schac_home_organization;
        $u->save();

        return $u;
    }
}
