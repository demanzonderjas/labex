<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeOffer extends Model
{
    protected $fillable = ["age", "procedures", "protocol_number_known", "protocol_number", "amount", "date_available"];

    public function sample()
    {
        return $this->belongsTo('App\Sample');
    }
}
