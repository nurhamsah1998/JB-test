<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public int $token_expired = 90;
    public function register(Request $request):mixed
    {
        /// VALIDATION FORM
        $request->validate(rules :[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

         /// STORING DATA TO DB
        $user = User::create(attributes:[
            'name' => $request->name,
            'email' => $request->email,
            'is_admin' => true,
            'password' => Hash::make(value: $request->password),
        ]);
        /// CREATE FIRST CATEGORY
        Category::create([
            'name' => 'How to talk',
            'user_id' => $user->id
        ]);
        /// RETURNING USER INCLUDING WITH TOKEN
        $token = Auth::login($user, $this->token_expired);
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
        /// VALIDATION FORM
        $request->validate(rules :[
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials, $this->token_expired);
        if(!$token){
            return response()->json(data:[
                'status' => 'error',
                'message' => 'error login credential',
                ], status: 400);
        }
        $user = Auth::user();
        return response()->json(data:[
            'status' => 'success',
            'message' => 'login successfully',
            'user' =>  $user,
            'authorization' => [
                'token'=> $token,
                'type'=> 'bearer'
            ]
            ]);
    }

    public function myProfile(Request $request): mixed
    {
        $user = Auth::user();
        return response()->json(data:[
            'status' => 'success',
            'message' =>  'successfully log out',
            'data' => $user
            ]);
    }

    public function logout(Request $request): mixed
    {
        Auth::logout();
        return response()->json(data:[
            'status' => 'success',
            'message' =>  'successfully log out',
            ]);
    }
}
