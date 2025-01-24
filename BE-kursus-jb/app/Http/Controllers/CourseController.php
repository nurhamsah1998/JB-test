<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
        //// PRIVATE CONTROLLER
    public function readPrivateCourse() {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();
        $data = Course::where('user_id',$user->id )->with(['category', 'program'])->get();
        return response()->json(data:[
            'status' => 'success',
            'data' => $data,
            ]);
   }
    public function readPrivateCourseById($id) {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();
        $findData = Course::where('user_id', $user->id )->with(['category', 'program', 'material'])->get();
        $data = $findData->findOrFail($id);
        return response()->json(data:[
            'status' => 'success',
            'data' => $data,
            ]);
   }

    public function store(Request $request) {
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
        $file_path = null;
        if($request->thumbnail){
            $file_path = $request->file('thumbnail')->store('thumbnail', 'public');
        }

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

   public function destroy($id) {
        $data = Course::where('id', $id)->with('material')->first();
        if($data) {
            /// FILTERING ONLY SOURCE PATH NOT URL LINK
            $material_file_document = array_filter($data->material->toArray(), function($item){
                return !str_contains($item['source_path'], 'https') ;
            });
            /// REBUILDING FOR BULK DELETE
            $material_path_sourse = array_map(function($item){
                return $item['source_path'];
            }, $material_file_document);
            /// DELETE THUMBNAIL FILE
            if($data->thumbnail_path && Storage::disk('public')->exists($data->thumbnail_path)){
                Storage::disk('public')->delete($data->thumbnail_path);
            }
            if(count($material_path_sourse) !== 0){
                /// BULK DELETE MATERIAL FILE 
                Storage::disk('public')->delete($material_path_sourse);
            }
            ///
            $data->delete();
            return response()->json(data:[
                'status' => 'success',
                'message' => 'successfully delete course',
                'datas'=> $data,
                'v'=> $material_path_sourse
                ]);
        } else {
            return response()->json(data:[
                'status' => 'error',
                'message' => 'material not found',
                ], status: 400);
        }
    }

    //// PUBLIC CONTROLLER
    public function getThumbnail($path) {
        $thumbnail_path = storage_path('storage/'.$path);
        // $thumbnail = InterventionImage::make(thumbnail_path)->resize(150,150)->encode('jpg');
        return response()->file($thumbnail_path);
   }

    public function readPublicCourse() {
        $data = Course::with(['category', 'program', 'user'])->get();
        return response()->json(data:[
            'status' => 'success',
            'data' => $data,
            ]);
   }

    public function readPublicCourseById($id) {
        $findData = Course::where('id', $id)->with(['category', 'program', 'material', 'user'])->get();
        $data = $findData->findOrFail($id);
        if(!$data){
            return response()->json(data:[
                'status' => 'success',
                'data' => $data,
                ]);
        }
        return response()->json(data:[
            'status' => 'success',
            'data' => $data,
            ]);

    }
}
