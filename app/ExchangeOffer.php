<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeOffer extends Model
{
    protected $fillable = ["age", "procedures", "protocol_number_known", "protocol_number", "amount", "date_available"];

    protected $with = ["sample"];

    public function sample()
    {
        return $this->morphOne('App\Sample', 'sampleable');
    }
}
