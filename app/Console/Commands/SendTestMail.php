<?php

namespace App\Console\Commands;

use App\ExchangeAttempt;
use App\Mail\Admin\AdminOfferAddedEmail;
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
        $attempt = ExchangeAttempt::first();

        Mail::to($this->argument('email'))->queue(new AdminOfferAddedEmail($attempt));

        return 0;
    }
}
