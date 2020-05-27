<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeRequest extends Model
{
    protected $fillable = [
        "is_age_relevant",
        "age",
        "date_requested",
        "amount",
        "animal_species",
        "tribe",
        "gender",
        "weight_type",
        "weight",
        "origin",
        "spf",
        "microbiome",
        "organs",
        "storage",
        "naive",
        "inconvenience_level",
        "kill_method",
        "sample_number"
    ];

    public function isMatch(ExchangeOffer $offer)
    {
        return $offer->animal_species == $this->animal_species;
    }
}
