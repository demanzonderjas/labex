<?php

namespace App\Http\Middleware;

use App\Signup;
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
            return redirect("/", 302);
        }

        $matchingUser = DB::table('signups')
            ->whereRaw('LOWER(`email`) LIKE ? ', [trim(strtolower($request->user()->email)) . '%'])
            ->first();

        if (empty($matchingUser)) {
            abort(403, 'You do not have the right access level. Please sign up first to show that you are article 9 qualified.');
        }

        return $next($request);
    }
}
