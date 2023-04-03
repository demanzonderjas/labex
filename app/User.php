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

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'organisation'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function scopeWhereIsAdmin(Builder $query)
    {
        return $query->where("email", env('ADMIN_MAIL', 'info@atex.uu.nl'));
    }
}
