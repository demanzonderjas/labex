<?php

use App\Signup;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name =  "Offer Demo";
        $user->email = "weustenraad@gmail.com";
        $user->organisation = "uu.nl";
        $user->is_admin = true;
        $user->token = env('TEST_API_TOKEN');
        $user->save();

        $signup = new Signup();
        $signup->email = $user->email;
        $signup->name = $user->name;
        $signup->approved = true;
        $signup->save();

        $user = new User();
        $user->name =  "Request Demo";
        $user->email = "daan@puzzel.org";
        $user->organisation = "uu.nl";
        $user->is_admin = true;
        $user->token = Str::random(40);
        $user->save();

        $signup = new Signup();
        $signup->email = $user->email;
        $signup->name = $user->name;
        $signup->approved = true;
        $signup->save();
    }
}
