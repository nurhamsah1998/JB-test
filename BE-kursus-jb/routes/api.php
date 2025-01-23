<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\CategoryController;

Route::post(uri: '/register', action: [AuthController::class, 'register']);
Route::post(uri: '/login', action: [AuthController::class, 'login']);
Route::post(uri: '/logout', action: [AuthController::class, 'logout'])->middleware(middleware:['auth:api']);
Route::post(uri: '/refresh-token', action: [AuthController::class, 'refreshToken'])->middleware(middleware:['auth:api']);
Route::post(uri: '/category', action: [CategoryController::class, 'store'])->middleware(middleware:['auth:api']);
Route::get(uri: '/category', action: [CategoryController::class, 'readAll'])->middleware(middleware:['auth:api']);
Route::get(uri: '/program', action: [ProgramController::class, 'readAll'])->middleware(middleware:['auth:api']);
Route::get(uri: '/my-course', action: [CourseController::class, 'readAllMyCourse'])->middleware(middleware:['auth:api']);
Route::get(uri: '/my-course/{id}', action: [CourseController::class, 'readMyCourseById'])->middleware(middleware:['auth:api']);
Route::post(uri: '/my-course', action: [CourseController::class, 'storeMyCourse'])->middleware(middleware:['auth:api']);
Route::post(uri: '/my-course/material', action: [CourseController::class, 'storeMyMaterialCourse'])->middleware(middleware:['auth:api']);
Route::get(uri: '/course', action: [CourseController::class, 'readAllCourse'])->middleware(middleware:['auth:api']);
Route::get(uri: '/course/thumbnail/{path}', action: [CourseController::class, 'getThumbnail']);
