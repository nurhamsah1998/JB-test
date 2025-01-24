<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MaterialController;

Route::post(uri: '/register', action: [AuthController::class, 'register']);
Route::post(uri: '/login', action: [AuthController::class, 'login']);
Route::post(uri: '/logout', action: [AuthController::class, 'logout'])->middleware(middleware:['auth:api']);
Route::get(uri: '/my-profile', action: [AuthController::class, 'myProfile'])->middleware(middleware:['auth:api']);
Route::post(uri: '/category', action: [CategoryController::class, 'store'])->middleware(middleware:['auth:api']);
Route::get(uri: '/category', action: [CategoryController::class, 'readAll'])->middleware(middleware:['auth:api']);
Route::get(uri: '/program', action: [ProgramController::class, 'readAll'])->middleware(middleware:['auth:api']);
Route::get(uri: '/my-course', action: [CourseController::class, 'readPrivateCourse'])->middleware(middleware:['auth:api']);
Route::get(uri: '/my-course/{id}', action: [CourseController::class, 'readPrivateCourseById'])->middleware(middleware:['auth:api']);
Route::post(uri: '/my-course', action: [CourseController::class, 'store'])->middleware(middleware:['auth:api']);
Route::delete(uri: '/my-course/{id}', action: [CourseController::class, 'destroy'])->middleware(middleware:['auth:api']);
Route::post(uri: '/my-course/material', action: [MaterialController::class, 'store'])->middleware(middleware:['auth:api']);
Route::delete(uri: '/my-course/material/{id}', action: [MaterialController::class, 'destroy'])->middleware(middleware:['auth:api']);
Route::get(uri: '/course', action: [CourseController::class, 'readPublicCourse']);
Route::get(uri: '/course/{id}', action: [CourseController::class, 'readPublicCourseById']);
Route::get(uri: '/course/thumbnail/{path}', action: [CourseController::class, 'getThumbnail']);
