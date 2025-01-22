<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post(uri: '/register', action: [AuthController::class, 'register']);
Route::post(uri: '/login', action: [AuthController::class, 'login']);
Route::post(uri: '/logout', action: [AuthController::class, 'logout'])->middleware(middleware:['auth:api']);
Route::post(uri: '/refresh-token', action: [AuthController::class, 'refreshToken'])->middleware(middleware:['auth:api']);
