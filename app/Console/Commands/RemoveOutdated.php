<?php

namespace App\Console\Commands;

use App\ExchangeAttempt;
use App\Mail\Admin\AdminSuitableForAdoptionDeactivatedEmail;
use App\Mail\Admin\AdminSuitableForAdoptionReminderEmail;
use App\Mail\NotSuitableForAdoptionDeactivatedEmail;
use App\Mail\SuitableForAdoptionDeactivatedEmail;
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
                if ($offer->suitable_for_adoption && $offer->status === config('atex.constants.exchange_attempt_status.active')) {
                    foreach ($admins as $admin) {
                        Mail::to($admin)->queue(new AdminSuitableForAdoptionDeactivatedEmail($offer));
                    }
                    Mail::to($offer->user)->queue(new SuitableForAdoptionDeactivatedEmail($offer));
                } else if (!$offer->suitable_for_adoption && $offer->status === config('atex.constants.exchange_attempt_status.active')) {
                    Mail::to($offer->user)->queue(new NotSuitableForAdoptionDeactivatedEmail($offer));
                }
                $offer->status = config('atex.constants.exchange_attempt_status.inactive');
                $offer->save();
            } else if ($date->diffInDays($now) === config('atex.constants.days_before_adoption_reminder') && $offer->suitable_for_adoption) {
                foreach ($admins as $admin) {
                    Mail::to($admin)->queue(new AdminSuitableForAdoptionReminderEmail($offer));
                }
            }
        }
        $requests = ExchangeAttempt::requests()->get();
        foreach ($requests as $request) {
            $dateRequestedSpec = $request->specifications->firstWhere('key', 'date_requested');
            $requestedValue = $dateRequestedSpec ? $dateRequestedSpec->value : null;
            if (empty($requestedValue) || empty($request->user)) {
                continue;
            }
            $date = Carbon::createFromFormat("Y-m-d", $requestedValue);
            $endDate = $date->copy()->addDays(config('atex.constants.days_before_inactive'));
            if ($endDate->isBefore($now) && $request->status != config('atex.constants.exchange_attempt_status.inactive')) {
                $request->status = config('atex.constants.exchange_attempt_status.inactive');
                $request->save();
            }
        }
    }
}
