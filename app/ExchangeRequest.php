<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ExchangeRequest extends Model
{
    protected $fillable = [
        "animal_species",
        "date_requested",
        "strain",
        "amount",
        "age_type",
        "age_min",
        "age_max",
        "type",
        "sex",
        "origin",
        "spf",
        "organs",
        "storage",
        "kill_method",
        "extra_info"
    ];

    protected $with = ['user'];

    public $appends = ['is_match', 'is_mine'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getIsMatchAttribute()
    {
        return Match::where('exchange_request_id', $this->id)->exists();
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
