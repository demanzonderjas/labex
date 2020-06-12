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
    ];

    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
