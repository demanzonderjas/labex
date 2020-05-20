<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Exception;

class VerifyApiUserToken
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
        try {
            $token = $request->header('X-API-USER-TOKEN');
            $user = User::where('token', $token)->firstOrFail();
            $request->merge(['user' => $user]);
            $request->setUserResolver(function () use ($user) {
                return $user;
            });
            return $next($request);
        } catch (Exception $e) {
            return response()->json(["success" => false, "message" => "User is not authorized."]);
        }
    }
}
