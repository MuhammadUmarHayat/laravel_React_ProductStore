<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\productController;


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('addProduct', [productController::class, 'addProduct']);
Route::get('productlist', [productController::class, 'list']);
Route::delete('deleteproduct/{id}', [ProductController::class, 'delete']);
Route::get('product/{id}', [productController::class, 'getProduct']);
Route::get('search/{key}', [productController::class, 'searchProduct']);
Route::post('update/{id}', [productController::class, 'update']);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

