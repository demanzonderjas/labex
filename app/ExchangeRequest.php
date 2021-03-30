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
        "protocol_number",
        "kill_method",
        "extra_info",
        "origin_id"
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
        return MaterialMatch::where('exchange_request_id', $this->id)->exists();
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
