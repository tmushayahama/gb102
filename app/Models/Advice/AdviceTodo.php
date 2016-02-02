<?php

namespace App\Models\Advice;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class AdviceTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_advice_todo';
 public $timestamps = false;

 public function advice() {
  return $this->belongsTo('App\Models\Advice\Advice', 'advice_id');
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

 public static function getAdviceTodos($adviceId) {
  $adviceTodos = AdviceTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->get();
  return $adviceTodos;
 }

 public static function getAdviceTodo($adviceId, $todoId) {
  $adviceTodo = AdviceTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->where('todo_id', $todoId)
    ->first();
  return $adviceTodo;
 }

 public static function createAdviceTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceId = Request::get("adviceId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $adviceTodo = new AdviceTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $adviceTodo->advice_id = $adviceId;

  DB::beginTransaction();
  try {
   $todo->save();
   $adviceTodo->todo()->associate($todo);
   $adviceTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceTodo;
 }

 public static function editAdviceTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceTodoId = Request::get("adviceTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $adviceTodo = AdviceTodo::find($adviceTodoId);
  $adviceTodo->todo->title = $title;
  $adviceTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $adviceTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceTodo;
 }

}
