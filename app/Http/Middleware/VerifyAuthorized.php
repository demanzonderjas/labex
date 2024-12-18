<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;

class VerifyAuthorized
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->user()) {
            return redirect("/?target_url=" .  urlencode($request->fullUrl()), 302);
        }

        return $next($request);
    }
}
