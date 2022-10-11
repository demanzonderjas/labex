<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeAttempt extends Model
{
	use HasFactory;

	public $with = ["specifications"];

	// public $appends = ["is_match"];

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

	public function getTypeAttribute()
	{
		$typeSpec = $this->specifications->firstWhere('key', 'type');
		return $typeSpec ? $typeSpec->value : null;
	}

	public function getDateAvailableAttribute()
	{
		$dateAvailableSpec = $this->specifications->firstWhere('key', 'date_available');
		return $dateAvailableSpec ? $dateAvailableSpec->value : null;
	}

	public function getOrgansAttribute()
	{
		$organSpec = $this->specifications->firstWhere('key', 'organs');
		return $organSpec ? $organSpec->value : null;
	}

	public function getSuitableForAdoptionAttribute()
	{
		$suitable_for_adoption = $this->specifications->firstWhere('key', 'suitable_for_adoption');
		return $suitable_for_adoption ? $suitable_for_adoption->value === "yes" : false;
	}

	public function scopeOffers($query)
	{
		return $query->where('attempt_type', '=', config('atex.constants.offer'));
	}

	public function replicate(?array $except = null)
	{
		$copy = parent::replicate();
		$copy->status = config('atex.constants.exchange_attempt_status.active');
		$copy->save();

		foreach ($this->specifications as $specification) {
			$spec = new Specification([
				"key" => $specification->key,
				"value" => $specification->value,
				"exchange_attempt_id" => $copy->id
			]);
			$spec->save();
		}

		return $copy->fresh();
	}

	public function getIsMatchAttribute()
	{
		if ($this->attempt_type === config('atex.constants.offer') && $this->matchViaOffer()->exists()) {
			return $this->matchViaOffer->status !== "rejected";
		} else if ($this->attempt_type === config('atex.constants.request') && $this->matchViaRequest()->exists()) {
			return $this->matchViaRequest->status !== "rejected";
		}
		return false;
	}
}
