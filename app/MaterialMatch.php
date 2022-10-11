<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class MaterialMatch extends Model
{

    public $table = "matches";

    public $with = ["request", "offer"];

    public function request()
    {
        return $this->belongsTo(ExchangeAttempt::class, 'request_id');
    }

    public function offer()
    {
        return $this->belongsTo(ExchangeAttempt::class, 'offer_id');
    }

    public function isExisting(ExchangeAttempt $request, ExchangeAttempt $offer)
    {
        return $this->request_id == $request->id && $this->offer_id == $offer->id;
    }

    public function getTypeAttribute()
    {
        return $this->offer->type;
    }

    public function scopeWhereBelongsToUser(Builder $query, User $user)
    {
        return $query
            ->whereHas("request.user", function (Builder $query) use ($user) {
                $query->where('id', $user->id);
            })
            ->orWhereHas("offer.user", function (Builder $query) use ($user) {
                $query->where('id', $user->id);
            })->orderByDesc('updated_at');
    }

    public function isActive()
    {
        return $this->status !== "rejected";
    }
}
