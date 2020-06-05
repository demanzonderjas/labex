<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeRequest extends Model
{
    protected $fillable = [
        "age",
        "date_requested",
        "amount",
        "animal_species",
        "strain",
        "sex",
        "weight_type",
        "weight",
        "microbiome",
        "origin",
        "spf",
        "organs",
        "storage",
        "naive",
        "inconvenience_level",
        "kill_method",
    ];

    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isMatch(ExchangeOffer $offer)
    {
        return $offer->animal_species == $this->animal_species;
    }
}
