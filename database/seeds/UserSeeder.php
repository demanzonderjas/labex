<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
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
        $user->email = "offer@labexplatform.nl";
        $user->is_admin = true;
        $user->token = env('TEST_API_TOKEN');
        $user->save();

        $user = new User();
        $user->name =  "Request Demo";
        $user->email = "request@labexplatform.nl";
        $user->is_admin = true;
        $user->token = Str::random(40);
        $user->save();

        $user = new User();
        $user->name =  "Demo";
        $user->email = "demo@labexplatform.nl";
        $user->password = Hash::make('demolab');
        $user->is_admin = true;
        $user->token = Str::random(40);
        $user->save();
    }
}
