<?php

namespace App\Http\Middleware;

use App\Signup;
use Closure;

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
            return redirect("/", 302);
        }

        $signup = Signup::where([
            'email' => $request->user()->email,
            'approved' => true
        ])->first();

        if (empty($signup)) {
            abort(403, 'You do not have the right access level.');
        }

        return $next($request);
    }
}
