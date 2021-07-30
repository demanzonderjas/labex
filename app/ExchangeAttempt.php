<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeAttempt extends Model
{
	use HasFactory;

	public $with = ["specifications"];

	public $hidden = ["origin_id"];

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function specifications()
	{
		return $this->hasMany(Specification::class);
	}

	public function scopeRequests($query)
	{
		return $query->where('attempt_type', '=', config('atex.constants.request'));
	}

	public function scopeOffers($query)
	{
		return $query->where('attempt_type', '=', config('atex.constants.offer'));
	}
}
