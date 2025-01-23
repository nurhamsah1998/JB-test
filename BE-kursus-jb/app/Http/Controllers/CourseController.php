<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    public function readAllMyCourse() {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();
        $data = Course::where('user_id',$user->id )->with(['category', 'program'])->get();
        return response()->json(data:[
            'status' => 'success',
            'data' => $data,
            ]);
   }
    public function readMyCourseById($id) {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();
        $findData = Course::where('user_id',$user->id )->with(['category', 'program'])->get();
        $data = $findData->findOrFail($id);
        return response()->json(data:[
            'status' => 'success',
            'data' => $data,
            ]);
   }

    public function storeMyCourse(Request $request) {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();

        /// VALIDATION FORM
        $request->validate(rules :[
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|max:100000000',
            'description' => 'nullable|string|max:5000',
            'thumbnail' => 'nullable|file|mimes:jpg,png|max:2024',
            'level' => 'required|in:very_easy,easy,normal,hard,very_hard',
            'program_id' => 'required|exists:programs,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $file_path = $request->file('thumbnail')->store('thumbnail', 'public');
        Log::info( $file_path);
        Course::create(attributes:[
            'thumbnail_path' => $file_path,
            'name' => $request->name,
            'user_id' => $user->id,
            'price' => $request->price,
            'description' => $request->description,
            'level' => $request->level,
            'program_id' => $request->program_id,
            'category_id' => $request->category_id,
        ]);

        return response()->json(data:[
            'status' => 'success',
            'message' => 'successfully created course',
            'data' => $file_path,
            ]);
   }

    public function storeMyMaterialCourse(Request $request) {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();

        /// VALIDATION FORM
        $request->validate(rules :[
            'name' => 'required|string|max:255',
            'type' => 'required|in:file,url',
            'file_document' => 'nullable|file|mimes:jpg,png,pdf|max:2024',
            'course_id' => 'required|exists:programs,id',
        ]);

        $file_path = $request->file('file_document')->store('file_document', 'public');
        Log::info( $file_path);
        Material::create(attributes:[
            'source_path' => $file_path,
            'name' => $request->name,
            'type' => $request->type,
            'user_id' => $user->id,
            'course_id' => $request->course_id,
        ]);

        return response()->json(data:[
            'status' => 'success',
            'message' => 'successfully created course',
            'data' => $file_path,
            ]);
   }

    public function getThumbnail($path) {
        $thumbnail_path = storage_path('storage/'.$path);
        // $thumbnail = InterventionImage::make(thumbnail_path)->resize(150,150)->encode('jpg');
        return response()->file($thumbnail_path);
   }

    public function readAllCourse() {
        $data = Course::with('category')->get();
    
        // Cek apakah data relasi category dimuat
        dd($data); // Ini akan menampilkan seluruh data dan memeriksa apakah category ada di dalamnya
    
        return response()->json([
            'status' => 'success',
            'data' => $data,
        ]);
   }
}
