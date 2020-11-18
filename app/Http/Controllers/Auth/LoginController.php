<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function redirectToProvider()
    {
        $user = Socialite::driver('surfconext')->user();
        if ($user) {
            dd($user->accessTokenResponseBody);
        } else {
            return Socialite::driver('surfconext')->redirect();
        }
    }

    public function handleProviderCallback()
    {
        $user = Socialite::driver('surfconext')->user();
        dd("user", $user);
    }
}
