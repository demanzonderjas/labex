<?php

namespace App\Console\Commands;

use App\Signup;
use Illuminate\Console\Command;

class GiveSignupsOrganisation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'signups:organisation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sets the already inserted signups to a default organisation (UU), since these are all already inserted into the system.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        Signup::where('organisation', '')->get()->each(function ($signup) {

            if (strpos($signup->email, "umcutrecht.nl") !== false) {
                $signup->organisation = "umcutrecht";
            } else {
                $signup->organisation = "universiteit-utrecht";
            }
            $signup->save();
        });

        return 0;
    }
}
