<?php

namespace App\Http\Middleware;

use Closure;

class VerifyAdmin
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
        if (!$request->user()->is_admin) {
            abort(403, 'You are not qualified as an administrator.');
        }

        return $next($request);
    }
}
