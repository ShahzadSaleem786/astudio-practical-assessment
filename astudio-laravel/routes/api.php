<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TimesheetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Routes for User authentication
Route::post('/register', 'UserController@register');
Route::post('/login', 'UserController@login');

// Protected routes for authenticated users
Route::middleware('auth:api')->group(function () {
    // Routes for User endpoints
    Route::post('/users', 'UserController@create');
    Route::get('/users/{id}', 'UserController@read');
    Route::get('/users', 'UserController@readAll');
    Route::post('/users/{id}/update', 'UserController@update');
    Route::post('/users/{id}/delete', 'UserController@delete');

    // Routes for Project endpoints
    Route::post('/projects', 'ProjectController@create');
    Route::get('/projects/{id}', 'ProjectController@read');
    Route::get('/projects', 'ProjectController@readAll');
    Route::post('/projects/{id}/update', 'ProjectController@update');
    Route::post('/projects/{id}/delete', 'ProjectController@delete');

    // Routes for Timesheet endpoints
    Route::post('/timesheets', 'TimesheetController@create');
    Route::get('/timesheets/{id}', 'TimesheetController@read');
    Route::get('/timesheets', 'TimesheetController@readAll');
    Route::post('/timesheets/{id}/update', 'TimesheetController@update');
    Route::post('/timesheets/{id}/delete', 'TimesheetController@delete');

    // Logout route
    Route::post('/logout', 'UserController@logout');
});
