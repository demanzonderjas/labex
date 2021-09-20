<?php

namespace App\Console\Commands;

use App\ExchangeAttempt;
use App\Mail\Admin\AdminSuitableForAdoptionDeactivatedEmail;
use App\User;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

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
        $offers = ExchangeAttempt::offers()->get();
        $now = Carbon::now();
        foreach ($offers as $offer) {
            $date = Carbon::createFromFormat("Y-m-d", $offer->date_available);
            $endDate = $date->addDays(config('atex.constants.days_before_inactive'));
            if ($endDate->isBefore($now) && $offer->type != config('atex.constants.exchange_type.conserved_tissue') && $offer->status != config('atex.constants.exchange_attempt_status.inactive')) {
                $offer->status = config('atex.constants.exchange_attempt_status.inactive');
                $offer->save();

                if ($offer->suitable_for_adoption) {
                    $offer->status = config('atex.constants.exchange_attempt_status.adoption');
                    $offer->save();
                    // $admin = User::where('email', env('ADMIN_MAIL'))->first();
                    // Mail::to($admin)->queue(new AdminSuitableForAdoptionDeactivatedEmail($offer));
                }
            }
        }
    }
}
