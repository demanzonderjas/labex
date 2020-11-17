<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class UserController
{

    public function getActiveUser(Request $request)
    {
        return response()->json(["success" => true, "user" => $request->user()]);
    }
}
