<?php

namespace App\Models\Swipe;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class SwipeTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_swipe_todo';
 public $timestamps = false;

 public function swipe() {
  return $this->belongsTo('App\Models\Swipe\Swipe', 'swipe_id');
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

 public static function getSwipeTodos($swipeId) {
  $swipeTodos = SwipeTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->get();
  return $swipeTodos;
 }

 public static function getSwipeTodo($swipeId, $todoId) {
  $swipeTodo = SwipeTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->where('todo_id', $todoId)
    ->first();
  return $swipeTodo;
 }

 public static function createSwipeTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $swipeTodo = new SwipeTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $swipeTodo->swipe_id = $swipeId;

  DB::beginTransaction();
  try {
   $todo->save();
   $swipeTodo->todo()->associate($todo);
   $swipeTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeTodo;
 }

 public static function editSwipeTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeTodoId = Request::get("swipeTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $swipeTodo = SwipeTodo::find($swipeTodoId);
  $swipeTodo->todo->title = $title;
  $swipeTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $swipeTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeTodo;
 }

}
