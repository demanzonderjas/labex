<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
	use HasFactory;

	protected $fillable = ["exchange_attempt_id", "key", "value"];

	public $hidden = ["created_at", "updated_at", "exchange_attempt_id", "id"];
}
