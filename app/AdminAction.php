<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminAction extends Model
{
	use HasFactory;

	protected $fillable = ["match_id", "action", "message"];

	public function admin()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
