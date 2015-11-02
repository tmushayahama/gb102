<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */

Route::get('/', function () {
 return view('index');
});

Route::group(['prefix' => 'api'], function() {
 Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
 Route::post('authenticate', 'AuthenticateController@authenticate');
 Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
 Route::get('skills', 'Skill\SkillController@getSkills');
 Route::get('skill/{skillIdd}/todos', 'Skill\SkillController@getSkillTodos');
 Route::get('skill/{id}', 'Skill\SkillController@getSkill');
 Route::post('skill/todo/create', 'Skill\SkillController@createSkillTodo');
});


