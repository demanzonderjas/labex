<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
	use HasFactory;

	protected $fillable = ["exchange_attempt_id", "key", "value"];

	protected $casts = [
		"value" => "json"
	];

	public $hidden = ["created_at", "updated_at", "exchange_attempt_id", "id"];
}
