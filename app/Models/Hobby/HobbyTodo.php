<?php

namespace App\Models\Hobby;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class HobbyTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_hobby_todo';
 public $timestamps = false;

 public function hobby() {
  return $this->belongsTo('App\Models\Hobby\Hobby', 'hobby_id');
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

 public static function getHobbyTodos($hobbyId) {
  $hobbyTodos = HobbyTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->get();
  return $hobbyTodos;
 }

 public static function getHobbyTodo($hobbyId, $todoId) {
  $hobbyTodo = HobbyTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->where('todo_id', $todoId)
    ->first();
  return $hobbyTodo;
 }

 public static function createHobbyTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyId = Request::get("hobbyId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $hobbyTodo = new HobbyTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $hobbyTodo->hobby_id = $hobbyId;

  DB::beginTransaction();
  try {
   $todo->save();
   $hobbyTodo->todo()->associate($todo);
   $hobbyTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyTodo;
 }

 public static function editHobbyTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyTodoId = Request::get("hobbyTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $hobbyTodo = HobbyTodo::find($hobbyTodoId);
  $hobbyTodo->todo->title = $title;
  $hobbyTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $hobbyTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyTodo;
 }

}
