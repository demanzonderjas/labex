<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeRequest extends Model
{
    protected $fillable = [
        "animal_species",
        "date_requested",
        "strain",
        "amount",
        "age_type",
        "age_min",
        "age_max",
        "type",
        "sex",
        "origin",
        "spf",
        "organs",
        "storage",
        "kill_method",
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
