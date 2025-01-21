<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExchangeAttempt extends Model
{
	use HasFactory;

	public $with = ["specifications"];

	public $appends = ["is_mine", "is_match"];

	public $hidden = [];

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
		return $this->hasMany(MaterialMatch::class, 'offer_id');
	}

	public function matchViaRequest()
	{
		return $this->hasMany(MaterialMatch::class, 'request_id');
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

	public function getAgeAttribute()
	{
		$amountSpec = $this->specifications->firstWhere('key', 'age');
		return $amountSpec ? $amountSpec->value : null;
	}

	public function getAgeMinAttribute()
	{
		$amountSpec = $this->specifications->firstWhere('key', 'age_min');
		return $amountSpec ? $amountSpec->value : null;
	}

	public function getAgeMaxAttribute()
	{
		$amountSpec = $this->specifications->firstWhere('key', 'age_max');
		return $amountSpec ? $amountSpec->value : null;
	}

	public function getSpec(string $specKey)
	{
		$spec = $this->specifications->firstWhere('key', $specKey);
		return $spec ? $spec->value : null;
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
		$matches = DB::table('matches')->where('offer_id', $this->id)->orWhere('request_id', $this->id)->count();
		return $matches > 0;
	}

	public function getTitleAttribute()
	{
		$spec = $this->specifications->firstWhere('key', 'title');
		return $spec ? $spec->value : "";
	}

	public function getDescriptionAttribute()
	{
		$spec = $this->specifications->firstWhere('key', 'description');
		return $spec ? $spec->value : "";
	}

	public function getIsMineAttribute()
	{
		return $this->user->id === Auth::user()->id;
	}
}
