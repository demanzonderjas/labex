<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Signup extends Model
{
    protected $fillable = ["name", "email", "organisation"];

    public function scopeWhereUserIsEmailAdmin(Builder $query)
    {
        $emailRoles = auth()->user()->adminRoles->filter(function ($role) {
            return $role->type === "email";
        });

        $organisationRoles = auth()->user()->adminRoles->filter(function ($role) {
            return $role->type === "organisation";
        });

        foreach ($emailRoles as $role) {
            $query->orWhere('email', 'LIKE', '%' . $role->value . '%');
        }

        foreach ($organisationRoles as $role) {
            $query->orWhere('organisation', $role->value);
        }

        return $query->distinct()->get();
    }
}
