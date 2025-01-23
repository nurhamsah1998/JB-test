<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
   public function store(Request $request) {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();

        /// VALIDATION FORM
        $request->validate(rules :[
            'name' => 'required|string|max:255',
        ]);

        $data = Category::create(attributes:[
            'name' => $request->name,
            'user_id' => $user->id,
        ]);

        return response()->json(data:[
            'status' => 'success',
            'message' => 'successfully created category',
            'data' => $data,
            ]);
   }
   
   public function readAll() {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();
        $data = Category::where('user_id',$user->id )->get();

        return response()->json(data:[
            'status' => 'success',
            'data' => $data,
            ]);
   }
}
