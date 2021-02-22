<?php

namespace App\Console\Commands;

use App\ExchangeOffer;
use App\ExchangeRequest;
use App\Match;
use App\MaterialMatch;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;

class CreatePossibleMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'match:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Search database for possible matches and add to matches table if matching';

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
        $requests = ExchangeRequest::where('active', true)->get();
        $offers = ExchangeOffer::where('active', true)->get();
        $matches = MaterialMatch::all();

        foreach ($requests as $request) {
            $matchingOffers = $this->calculateMatchingOffers($request, $offers, $matches);
            $matchingOffers->each((function ($offer) use ($request) {
                $this->createMatch($request, $offer);
            }));
            $this->info($matchingOffers->count() . ' new possible matches made! :)');
        }
    }

    public function calculateMatchingOffers(ExchangeRequest $request, Collection $offers, Collection $matches)
    {
        return $offers->filter((function ($offer) use ($request, $matches) {
            return $request->isMatch($offer) && !$matches->contains(function ($match) use ($request, $offer) {
                return $match->isExisting($request, $offer);
            });
        }));
    }

    public function createMatch(ExchangeRequest $request, ExchangeOffer $offer)
    {
        $match = new MaterialMatch();
        $match->exchange_request_id = $request->id;
        $match->exchange_offer_id = $offer->id;
        $match->save();
    }
}
