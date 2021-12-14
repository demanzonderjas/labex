<?php

namespace App\Http\Middleware;

use App\ExchangeAttempt;
use Closure;
use Illuminate\Http\Request;

class EnsureUserIsOwner
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next)
	{
		$targetAttempt = ExchangeAttempt::findOrFail($request->attempt_id);

		if ($targetAttempt->user->id !== $request->user()->id) {
			return abort(403, 'Not your exchange attempt.');
		}

		return $next($request);
	}
}
