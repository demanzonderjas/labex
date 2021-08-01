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

	public function matchViaOffer()
	{
		return $this->hasOne(MaterialMatch::class, 'offer_id');
	}

	public function matchViaRequest()
	{
		return $this->hasOne(MaterialMatch::class, 'request_id');
	}

	public function scopeRequests($query)
	{
		return $query->where('attempt_type', '=', config('atex.constants.request'));
	}

	public function setAmountAttribute($value)
	{
		$amountSpec = $this->specifications->firstWhere('key', 'amount');
		$amountSpec->value = $value;
		$amountSpec->save();
	}

	public function setOrgansAttribute($value)
	{
		$amountSpec = $this->specifications->firstWhere('key', 'organs');
		$amountSpec->value = $value;
		$amountSpec->save();
	}

	public function getAmountAttribute()
	{
		$amountSpec = $this->specifications->firstWhere('key', 'amount');
		return $amountSpec ? $amountSpec->value : null;
	}

	public function getOrgansAttribute()
	{
		$organSpec = $this->specifications->firstWhere('key', 'organs');
		return $organSpec ? $organSpec->value : null;
	}

	public function scopeOffers($query)
	{
		return $query->where('attempt_type', '=', config('atex.constants.offer'));
	}
}
