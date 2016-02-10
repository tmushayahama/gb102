<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class ProjectTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_project_todo';
 public $timestamps = false;

 public function project() {
  return $this->belongsTo('App\Models\Project\Project', 'project_id');
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

 public static function getProjectTodos($projectId) {
  $projectTodos = ProjectTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->get();
  return $projectTodos;
 }

 public static function getProjectTodo($projectId, $todoId) {
  $projectTodo = ProjectTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->where('todo_id', $todoId)
    ->first();
  return $projectTodo;
 }

 public static function createProjectTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectId = Request::get("projectId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $projectTodo = new ProjectTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $projectTodo->project_id = $projectId;

  DB::beginTransaction();
  try {
   $todo->save();
   $projectTodo->todo()->associate($todo);
   $projectTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectTodo;
 }

 public static function editProjectTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectTodoId = Request::get("projectTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $projectTodo = ProjectTodo::find($projectTodoId);
  $projectTodo->todo->title = $title;
  $projectTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $projectTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectTodo;
 }

}
