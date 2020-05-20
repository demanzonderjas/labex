<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeRequest extends Model
{
    protected $fillable = ["is_age_relevant", "age", "date_requested", "amount"];

    public $with = ["sample"];

    public function sample()
    {
        return $this->morphOne('App\Sample', 'sampleable');
    }
}
