<?php

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
        $user->name =  "Daan";
        $user->email = "weustenraad@gmail.com";
        $user->organisation = "universiteit-utrecht";
        $user->is_admin = true;
        $user->token = env('TEST_API_TOKEN');
        $user->save();

        $user = new User();
        $user->name =  "Daan";
        $user->email = "daan@puzzel.org";
        $user->organisation = "universiteit-utrecht";
        $user->is_admin = false;
        $user->token = Str::random(40);
        $user->save();
    }
}
