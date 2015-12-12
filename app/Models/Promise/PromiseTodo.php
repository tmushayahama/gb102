<?php

namespace App\Models\Promise;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class PromiseTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_promise_todo';
 public $timestamps = false;

 public function promise() {
  return $this->belongsTo('App\Models\Promise\Promise', 'promise_id');
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

 public static function getPromiseTodos($promiseId) {
  $promiseTodos = PromiseTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->get();
  return $promiseTodos;
 }

 public static function getPromiseTodo($promiseId, $todoId) {
  $promiseTodo = PromiseTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->where('todo_id', $todoId)
    ->first();
  return $promiseTodo;
 }

 public static function createPromiseTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseId = Request::get("promiseId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $promiseTodo = new PromiseTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $promiseTodo->promise_id = $promiseId;

  DB::beginTransaction();
  try {
   $todo->save();
   $promiseTodo->todo()->associate($todo);
   $promiseTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseTodo;
 }

 public static function editPromiseTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseTodoId = Request::get("promiseTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $promiseTodo = PromiseTodo::find($promiseTodoId);
  $promiseTodo->todo->title = $title;
  $promiseTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $promiseTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseTodo;
 }

}
