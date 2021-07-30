<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeAttempt extends Model
{
	use HasFactory;

	public function specifications()
	{
		return $this->hasMany(Specification::class);
	}
}
