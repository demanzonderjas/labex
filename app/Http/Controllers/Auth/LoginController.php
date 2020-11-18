<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        if (!Socialite::driver('surfconext')->user()) {
            return Socialite::driver('surfconext')->redirect();
        }
        $user = Socialite::driver('surfconext')->user();
        dd("user", $user);
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        $user = Socialite::driver('surfconext')->user();
        dd("user", $user);

        // $user->token;
    }
}
