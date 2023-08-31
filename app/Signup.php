<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Signup extends Model
{
    protected $fillable = ["name", "email", "organisation", "awaiting_approval", "approved"];

    public function scopeWhereUserIsOrganisationAdmin(Builder $query)
    {
        $organisationRoles = auth()->user()->adminRoles->filter(function ($role) {
            return $role->type === "organisation";
        });

        foreach ($organisationRoles as $role) {
            $query->orWhere('organisation', $role->value);
        }

        $managedOrganisations = AdminRole::where('type', 'organisation')->get()->pluck('value');
        $query->orWhereNotIn('organisation', $managedOrganisations)->get();

        return $query->distinct()->get();
    }
}
