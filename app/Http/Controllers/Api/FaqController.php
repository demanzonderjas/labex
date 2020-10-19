<?php

namespace App\Http\Controllers\Api;

use App\FaqCategory;
use App\Http\Controllers\Controller;

class FaqController extends Controller
{
    public function getByCategory() {
        $categories = FaqCategory::all();
        return response()->json(["success" => true, "categories" => $categories->toArray()]);
    }
}