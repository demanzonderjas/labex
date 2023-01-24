<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use HiHaHo\EncryptableTrait\Encryptable;

class User extends Authenticatable
{
    use Notifiable;
    use Encryptable;

    protected $encryptable = [
        'name'
    ];

    protected $dontThrowDecryptException = true;

    protected $fillable = [
        'name', 'email', 'password', 'organisation'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function scopeWhereIsAdmin(Builder $query)
    {
        return $query->where("email", env('ADMIN_MAIL', 'info@atex.uu.nl'));
    }

    public function adminRoles()
    {
        return $this->hasMany(AdminRole::class);
    }

    public function adminRolesByValue()
    {
        return auth()->user()->adminRoles->map(function ($role) {
            return $role->value;
        });
    }

    public function organisationRoles()
    {
        return $this->adminRoles->filter(function ($role) {
            return $role->type === "organisation";
        });
    }

    public function scopeWhereActiveUserIsLocationAdmin(Builder $query)
    {
        return $query->whereIn('organisation', auth()->user()->adminRolesByValue())->where('is_admin', false)->get();
    }

    public function scopeWhereUserHasOrganisationAccess(Builder $query, array $organisations)
    {
        return $query->whereHas('adminRoles', function (Builder $query) use ($organisations) {
            $query->whereIn('value', $organisations);
        })->get();
    }
}
