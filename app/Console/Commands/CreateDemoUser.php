<?php

namespace App\Console\Commands;

use App\Signup;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateDemoUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:demo';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a user for the demo';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $EMAIL = "demo@labexplatform.nl";

        $user = User::firstOrNew(['email' => $EMAIL]);
        $user->name = "Demo";
        $user->organisation = "uu.nl";
        $user->is_admin = true;
        $user->token = Str::random(30);
        $user->password = Hash::make('demolab');
        $user->save();

        $signup = Signup::firstOrNew(['email' => $EMAIL]);
        $signup->name = "Demo";
        $signup->approved = true;
        $signup->save();
    }
}
