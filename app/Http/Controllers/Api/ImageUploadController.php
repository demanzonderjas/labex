<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{

	public function upload(Request $request)
	{
		$path = $request->file('image')->store('uploads', 'public');

		return response()->json(["success" => true, "path" => $path]);
	}

	public function delete(Request $request)
	{
		Storage::disk('public')->delete($request->path);

		return response()->json(["success" => true]);
	}
}
