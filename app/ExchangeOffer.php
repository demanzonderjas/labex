<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeOffer extends Model
{
    protected $fillable = [
        "type",
        "animal_species",
        "strain",
        "organs",
        "age",
        "date_available",
        "sex",
        "origin",
        "amount",
        "spf",
        "storage",
        "naive",
        "inconvenience_level",
        "kill_method",
        "protocol_number",
        "extra_info"
    ];

    protected $with = ['user'];

    public $appends = ['is_match'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getIsMatchAttribute()
    {
        return Match::where('exchange_offer_id', $this->id)->exists();
    }
}
