<?php

namespace App\Console\Commands;

use App\ExchangeOffer;
use App\ExchangeRequest;
use Illuminate\Console\Command;
use Carbon\Carbon;

class RemoveOutdated extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'material:outdated';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove outdated material';

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
     * @return mixed
     */
    public function handle()
    {
        $offers = ExchangeOffer::where('type', '!=', 'conserved_tissue')->get();
        $now = Carbon::now();
        foreach ($offers as $offer) {
            $date = Carbon::createFromFormat("Y-m-d", $offer->date_available);
            $endDate = $date->addDays(14);
            if ($endDate->isBefore($now)) {
                $offer->status = config('atex.constants.exchange_attempt_status.inactive');
                $offer->save();
            }
        }
    }
}
