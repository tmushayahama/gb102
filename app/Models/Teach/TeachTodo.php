<?php

namespace App\Models\Teach;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class TeachTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_teach_todo';
 public $timestamps = false;

 public function teach() {
  return $this->belongsTo('App\Models\Teach\Teach', 'teach_id');
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

 public static function getTeachTodos($teachId) {
  $teachTodos = TeachTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->get();
  return $teachTodos;
 }

 public static function getTeachTodo($teachId, $todoId) {
  $teachTodo = TeachTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->where('todo_id', $todoId)
    ->first();
  return $teachTodo;
 }

 public static function createTeachTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachId = Request::get("teachId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $teachTodo = new TeachTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $teachTodo->teach_id = $teachId;

  DB::beginTransaction();
  try {
   $todo->save();
   $teachTodo->todo()->associate($todo);
   $teachTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachTodo;
 }

 public static function editTeachTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachTodoId = Request::get("teachTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $teachTodo = TeachTodo::find($teachTodoId);
  $teachTodo->todo->title = $title;
  $teachTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $teachTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachTodo;
 }

}
