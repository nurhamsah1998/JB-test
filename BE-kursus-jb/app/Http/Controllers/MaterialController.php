<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MaterialController extends Controller
{
    public function store(Request $request) {
        /// GET USER ID INSIDE TOKEN
        $user = auth()->user();

        /// VALIDATION FORM
        $request->validate(rules :[
            'name' => 'required|string|max:255',
            'type' => 'required|in:video,document',
            'url' => 'nullable|string|active_url|max:255',
            'document_file' => 'nullable|file|mimes:jpg,png,pdf|max:9024',
            'course_id' => 'required|exists:programs,id',
        ]);
        $source_path = null;
        
        if($request->type === 'document'){
            $source_path = $request->file('document_file')->store('document', 'public');
        } else {
            $source_path = $request->url;
        }

        Material::create(attributes:[
            'source_path' => $source_path,
            'name' => $request->name,
            'type' => $request->type,
            'user_id' => $user->id,
            'course_id' => $request->course_id,
        ]);

        return response()->json(data:[
            'status' => 'success',
            'message' => 'successfully created material',
            'data' => $source_path,
            ]);
   }

    public function destroy($id) {
        $data = Material::where('id', $id)->first();
        if($data) {
            if(!Storage::disk('public')->exists($data->source_path)){
                return response()->json(data:[
                    'status' => 'error',
                    'message' => 'file not found',
                    ], status: 400);
            }
            Storage::disk('public')->delete($data->source_path);
            $data->delete();
            return response()->json(data:[
                'status' => 'success',
                'message' => 'successfully delete material',
                ]);
        }else {
            return response()->json(data:[
                'status' => 'error',
                'message' => 'material not found',
                ], status: 400);
    }
   }
}
