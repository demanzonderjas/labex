<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class MaterialMatch extends Model
{

    public $table = "matches";

    public $with = ["request", "offer", "request.user", "offer.user", "adminActions", "adminActions.admin"];

    public function request()
    {
        return $this->belongsTo(ExchangeAttempt::class, 'request_id')->withTrashed();
    }

    public function offer()
    {
        return $this->belongsTo(ExchangeAttempt::class, 'offer_id')->withTrashed();
    }

    public function adminActions()
    {
        return $this->hasMany(AdminAction::class, 'match_id');
    }

    public function isExisting(ExchangeAttempt $request, ExchangeAttempt $offer)
    {
        return $this->request_id == $request->id && $this->offer_id == $offer->id;
    }

    public function getTypeAttribute()
    {
        return $this->offer->type;
    }

    public function scopeWhereBelongsToUser(Builder $query, User $user)
    {
        return $query
            ->whereHas("request.user", function (Builder $query) use ($user) {
                $query->where('id', $user->id);
            })
            ->orWhereHas("offer.user", function (Builder $query) use ($user) {
                $query->where('id', $user->id);
            })->orderByDesc('updated_at');
    }

    public function isActive()
    {
        return $this->status !== "rejected";
    }

    public function scopeWhereActiveUserIsLocationAdmin(Builder $query)
    {
        $query->whereHas('offer.user', function ($query) {
            $query->whereIn('organisation', auth()->user()->adminRolesByValue());
        });

        $query->orWhereHas('request.user', function ($query) {
            $query->whereIn('organisation', auth()->user()->adminRolesByValue());
        });

        return $query->with('offer.user', 'request.user')->get();
    }

    public function getIsApprovedByYouAttribute()
    {
        $approval = $this->adminActions->first(function ($a) {
            return $a->action === "approve_match_once";
        });

        if (empty($approval)) {
            return false;
        }
        $connectedAdmin = User::find($approval->user_id);
        $adminOrganisations = $connectedAdmin->organisationRoles()->pluck('value');
        $activeAdminOrganisations = auth()->user()->organisationRoles()->pluck('value');

        return $activeAdminOrganisations->intersect($adminOrganisations)->count() > 0;
    }
}
