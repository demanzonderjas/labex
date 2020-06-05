<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeOffer extends Model
{
    protected $fillable = [
        "age",
        "animal_species",
        "strain",
        "sex",
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
        "sample_number",
        "procedures",
        "protocol_number_known",
        "protocol_number",
        "amount",
        "date_available"
    ];

    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
