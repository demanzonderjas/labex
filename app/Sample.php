<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sample extends Model
{
    protected $fillable = [
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

    public $timestamps = false;
}
