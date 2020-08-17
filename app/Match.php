<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
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

    public function scopeWhereBelongsToUser(Builder $query, User $user)
    {
        return $query
            ->whereHas("exchangeOffer.user", function (Builder $query) use ($user) {
                $query->where('id', $user->id);
            })
            ->orWhereHas("exchangeRequest.user", function (Builder $query) use ($user) {
                $query->where('id', $user->id);
            })->orderByDesc('updated_at');
    }
}
