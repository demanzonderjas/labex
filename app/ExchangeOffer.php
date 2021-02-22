<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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
        "extra_info"
    ];

    protected $with = ['user'];

    public $appends = ['is_match', 'is_mine'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function match()
    {
        return $this->hasOne(MaterialMatch::class);
    }

    public function getIsMatchAttribute()
    {
        return MaterialMatch::where('exchange_offer_id', $this->id)->exists();
    }

    public function getIsMineAttribute()
    {
        $user = Auth::user();
        if (empty($user)) {
            return false;
        }
        return $this->user->id == $user->id;
    }
}
