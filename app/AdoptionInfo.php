<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdoptionInfo extends Model
{
    use HasFactory;

    protected $table = "adoption_info";

    protected $fillable = ["offer_id"];
}
