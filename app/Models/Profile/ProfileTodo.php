<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class ProfileTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_profile_todo';
 public $timestamps = false;

 public function profile() {
  return $this->belongsTo('App\Models\Profile\Profile', 'profile_id');
 }

 public function todo() {
  return $this->belongsTo('App\Models\Todo\Todo', 'todo_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getProfileTodos($profileId) {
  $profileTodos = ProfileTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->get();
  return $profileTodos;
 }

 public static function getProfileTodo($profileId, $todoId) {
  $profileTodo = ProfileTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->where('todo_id', $todoId)
    ->first();
  return $profileTodo;
 }

 public static function createProfileTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileId = Request::get("profileId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $profileTodo = new ProfileTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $profileTodo->profile_id = $profileId;

  DB::beginTransaction();
  try {
   $todo->save();
   $profileTodo->todo()->associate($todo);
   $profileTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileTodo;
 }

 public static function editProfileTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileTodoId = Request::get("profileTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $profileTodo = ProfileTodo::find($profileTodoId);
  $profileTodo->todo->title = $title;
  $profileTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $profileTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileTodo;
 }

}
