<?php

namespace App\Models\Goal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class GoalTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_goal_todo';
 public $timestamps = false;

 public function goal() {
  return $this->belongsTo('App\Models\Goal\Goal', 'goal_id');
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

 public static function getGoalTodos($goalId) {
  $goalTodos = GoalTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->get();
  return $goalTodos;
 }

 public static function getGoalTodo($goalId, $todoId) {
  $goalTodo = GoalTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->where('todo_id', $todoId)
    ->first();
  return $goalTodo;
 }

 public static function createGoalTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalId = Request::get("goalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $goalTodo = new GoalTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $goalTodo->goal_id = $goalId;

  DB::beginTransaction();
  try {
   $todo->save();
   $goalTodo->todo()->associate($todo);
   $goalTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalTodo;
 }

 public static function editGoalTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalTodoId = Request::get("goalTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $goalTodo = GoalTodo::find($goalTodoId);
  $goalTodo->todo->title = $title;
  $goalTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $goalTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalTodo;
 }

}
