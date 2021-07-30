<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
	use HasFactory;

	public $hidden = ["created_at", "updated_at", "exchange_attempt_id", "id"];
}
