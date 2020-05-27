<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Match;

class MatchController extends Controller
{

    public function getAll()
    {
        $matches = Match::all();

        return response()->json(["success" => true, "matches" => $matches->toArray()]);
    }
}
