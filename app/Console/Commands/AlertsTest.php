<?php

namespace App\Console\Commands;

use App\ExchangeAttempt;
use App\Http\Controllers\Api\ExchangeAttemptController;
use Illuminate\Console\Command;

class AlertsTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'alerts:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Testing out how many alerts are found given a certain exchange attempt';

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
        $attempt = ExchangeAttempt::find(4);
        ExchangeAttemptController::activateAlerts($attempt);

        return 0;
    }
}
