<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Signup;
use Illuminate\Http\Request;

class SignupController extends Controller
{
    public function store(Request $request) {
        $signup = new Signup($request->all());
        $signup->save();

        return response()->json(["success" => true]);
    }
}