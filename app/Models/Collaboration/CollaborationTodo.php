<?php

namespace App\Models\Collaboration;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class CollaborationTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration_todo';
 public $timestamps = false;

 public function collaboration() {
  return $this->belongsTo('App\Models\Collaboration\Collaboration', 'collaboration_id');
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

 public static function getCollaborationTodos($collaborationId) {
  $collaborationTodos = CollaborationTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->get();
  return $collaborationTodos;
 }

 public static function getCollaborationTodo($collaborationId, $todoId) {
  $collaborationTodo = CollaborationTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->where('todo_id', $todoId)
    ->first();
  return $collaborationTodo;
 }

 public static function createCollaborationTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $collaborationTodo = new CollaborationTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $collaborationTodo->collaboration_id = $collaborationId;

  DB::beginTransaction();
  try {
   $todo->save();
   $collaborationTodo->todo()->associate($todo);
   $collaborationTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationTodo;
 }

 public static function editCollaborationTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationTodoId = Request::get("collaborationTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaborationTodo = CollaborationTodo::find($collaborationTodoId);
  $collaborationTodo->todo->title = $title;
  $collaborationTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $collaborationTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationTodo;
 }

}
