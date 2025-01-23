<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function readAll() {
        $data = Program::all();
        return response()->json(data:[
            'status' => 'success',
            'data' => $data,
            ]);
   }
}
