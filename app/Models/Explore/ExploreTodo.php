<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class ExploreTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_todo';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
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

 public static function getExploreTodos($exploreId, $levelId) {
  $exploreTodos = ExploreTodo::with('todo')
          ->with('todo.status')
          ->with('todo.creator')
          ->whereHas('todo', function($q) use ($levelId) {
           $q->where('level_id', $levelId);
          })
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->get();
  return $exploreTodos;
 }

 public static function getExploreTodo($exploreId, $todoId) {
  $exploreTodo = ExploreTodo::with('todo')
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->where('todo_id', $todoId)
          ->first();
  return $exploreTodo;
 }

 public static function createExploreTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $exploreTodo = new ExploreTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $exploreTodo->explore_id = $exploreId;

  DB::beginTransaction();
  try {
   $todo->save();
   $exploreTodo->todo()->associate($todo);
   $exploreTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreTodo;
 }

 public static function editExploreTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreTodoId = Request::get("exploreTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreTodo = ExploreTodo::find($exploreTodoId);
  $exploreTodo->todo->title = $title;
  $exploreTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $exploreTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreTodo;
 }

}
