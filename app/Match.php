<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    public $with = ["exchangeRequest", "exchangeOffer"];

    public function exchangeRequest()
    {
        return $this->belongsTo(ExchangeRequest::class);
    }

    public function exchangeOffer()
    {
        return $this->belongsTo(ExchangeOffer::class);
    }

    public function isExisting(ExchangeRequest $request, ExchangeOffer $offer)
    {
        return $this->exchange_request_id == $request->id && $this->exchange_offer_id == $offer->id;
    }
}
