<?php

namespace App\Http\Controllers\Api;

use App\FaqCategory;
use App\FaqItem;
use App\Http\Controllers\Controller;

class FaqController extends Controller
{
    public function getByCategory() {
        $categories = FaqCategory::with('faqItems')->get();
        return response()->json(["success" => true, "categories" => $categories->toArray()]);
    }

    public function getAllItems() {
        $items = FaqItem::all();
        return response()->json(["success" => true, "items" => $items->toArray()]);
    }

    public function deleteItem($itemId) {
        $item = FaqItem::find($itemId);
        $item->delete();
        return response()->json(["success" => true]);
    }
}