<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeOffer extends Model
{
    public function sample()
    {
        return $this->belongsTo('App\Sample');
    }
}
