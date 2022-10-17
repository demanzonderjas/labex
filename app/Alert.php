<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    use HasFactory;

    protected $casts = [
        "specifications" => 'json'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getSpec(string $specKey)
    {
        foreach ($this->specifications as $spec) {
            if ($spec['key'] === $specKey) {
                return $spec["value"];
            }
        }
        return null;
    }

    public function getAttemptTypeAttribute()
    {
        foreach ($this->specifications as $spec) {
            if ($spec['key'] === "attempt_type") {
                return $spec["value"];
            }
        }
    }
}
