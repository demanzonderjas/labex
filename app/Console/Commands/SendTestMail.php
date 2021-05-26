<?php

namespace App\Console\Commands;

use App\Mail\MatchMadeEmail;
use App\MaterialMatch;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendTestMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:test {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send test mail via SMTP- mailserver';

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
        $match = MaterialMatch::first();
        $targetUser = new User();
        $targetUser->email = $this->argument('email');
        $targetUser->name = "Test";
        $targetUser->token = "asdkasodjasjdaijdasjdjd";
        $targetUser->save();

        Mail::to($targetUser)->queue(new MatchMadeEmail($match, $targetUser));

        return 0;
    }
}
