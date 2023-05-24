<?php

namespace App\Console\Commands;

use App\ExchangeAttempt;
use App\Mail\Admin\AdminSuitableForAdoptionDeactivatedEmail;
use App\Mail\Admin\AdminSuitableForAdoptionReminderEmail;
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
            if (!$offer->date_available || empty($offer->user)) {
                continue;
            }

            $admins = User::whereUserGetsOrganisationAdminEmail([$offer->user->organisation]);

            $date = Carbon::createFromFormat("Y-m-d", $offer->date_available);
            $endDate = $date->copy()->addDays(config('atex.constants.days_before_inactive'));
            if ($offer->type != config('atex.constants.exchange_type.conserved_tissue') && $endDate->isBefore($now) && $offer->status != config('atex.constants.exchange_attempt_status.inactive')) {
                $offer->status = config('atex.constants.exchange_attempt_status.inactive');
                $offer->save();

                if ($offer->suitable_for_adoption && $offer->status === config('atex.constants.exchange_attempt_status.active')) {
                    foreach ($admins as $admin) {
                        Mail::to($admin)->queue(new AdminSuitableForAdoptionDeactivatedEmail($offer));
                    }
                }
            } else if ($date->diffInDays($now) === config('atex.constants.days_before_adoption_reminder') && $offer->suitable_for_adoption) {
                foreach ($admins as $admin) {
                    Mail::to($admin)->queue(new AdminSuitableForAdoptionReminderEmail($offer));
                }
            }
        }
    }
}
