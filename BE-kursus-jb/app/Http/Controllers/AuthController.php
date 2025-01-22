<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request):mixed
    {
        $request->validate(rules :[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create(attributes:[
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make(value: $request->password),
        ]);

        $token = Auth::login($user,10);
        return response()->json(data:[
            'status' => 'success',
            'message' => 'successfully register',
            'user' => $user,
            'authorization' => [
                'token'=> $token,
                'type'=> 'bearer'
            ]
            ]);
    }

    public function login(Request $request): mixed
    {
        $request->validate(rules :[
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials,10);
        if(!$token){
            return response()->json(data:[
                'status' => 'error',
                'message' => 'error login credential',
                ], status: 400);
        }
        $user = Auth::user();
        return response()->json(data:[
            'status' => 'success',
            'user' =>  $user,
            'authorization' => [
                'token'=> $token,
                'type'=> 'bearer'
            ]
            ]);
    }

    public function refreshToken(Request $request): mixed
    {
        return response()->json(data:[
            'status' => 'success',
            'user' =>  Auth::user(),
            'authorization' => [
                'token'=> Auth::refresh($request->bearerToken(),10 ),
                'type'=> 'bearer'
            ]
            ]);
    }

    public function logout(Request $request): mixed
    {
        Auth::logout();
        return response()->json(data:[
            'status' => 'success',
            'user' =>  'successfully log out',
            ]);
    }
}
