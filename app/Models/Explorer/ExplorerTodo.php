<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class ExplorerTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_todo';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
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

 public static function getExplorerTodos($explorerId, $statusId) {
  $explorerTodos = ExplorerTodo::with('todo')
          ->with('todo.status')
          ->with('todo.creator')
          ->whereHas('todo', function($q) use ($statusId) {
           $q->where('status_id', $statusId);
          })
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerTodos;
 }

 public static function getExplorerTodo($explorerId, $todoId) {
  $explorerTodo = ExplorerTodo::with('todo')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->where('todo_id', $todoId)
          ->first();
  return $explorerTodo;
 }

 public static function createExplorerTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $levelId = Request::get("level_id");
  $statusId = Request::get("status_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $explorerTodo = new ExplorerTodo;
  $todo->creator_id = $userId;
  $todo->level_id = $levelId;
  $todo->status_id = $statusId;
  $todo->title = $title;
  $todo->description = $description;
  $explorerTodo->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $todo->save();
   $explorerTodo->todo()->associate($todo);
   $explorerTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerTodo;
 }

 public static function editExplorerTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerTodoId = Request::get("explorerTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerTodo = ExplorerTodo::find($explorerTodoId);
  $explorerTodo->todo->title = $title;
  $explorerTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $explorerTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerTodo;
 }

}
