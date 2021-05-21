<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Signup;
use App\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function redirectToProvider()
    {
        if (env('APP_ENV') !== "production") {
            $user = User::where('email', 'weustenraad@gmail.com')->first();
            Auth::login($user);
            return redirect()->to('/app/dashboard');
        }
        return Socialite::driver('surfconext')->redirect();
    }

    public function handleProviderCallback()
    {
        try {
            $ssoUser = Socialite::driver('surfconext')->user();
            $existingUser = User::where('email', $ssoUser->email)->first();
            if ($existingUser !== null) {
                Auth::login($existingUser);
                return redirect()->to('/app/dashboard');
            } else {
                $u = $this->createNewUser($ssoUser);
                Auth::login($u);
                return redirect()->to('/app/dashboard');
            }
        } catch (Exception $e) {
            abort(403, $e->getMessage());
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
