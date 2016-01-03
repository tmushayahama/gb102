<?php

namespace App\Models\Group;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class GroupTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_group_todo';
 public $timestamps = false;

 public function group() {
  return $this->belongsTo('App\Models\Group\Group', 'group_id');
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

 public static function getGroupTodos($groupId) {
  $groupTodos = GroupTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->get();
  return $groupTodos;
 }

 public static function getGroupTodo($groupId, $todoId) {
  $groupTodo = GroupTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->where('todo_id', $todoId)
    ->first();
  return $groupTodo;
 }

 public static function createGroupTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupId = Request::get("groupId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $groupTodo = new GroupTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $groupTodo->group_id = $groupId;

  DB::beginTransaction();
  try {
   $todo->save();
   $groupTodo->todo()->associate($todo);
   $groupTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupTodo;
 }

 public static function editGroupTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupTodoId = Request::get("groupTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $groupTodo = GroupTodo::find($groupTodoId);
  $groupTodo->todo->title = $title;
  $groupTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $groupTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupTodo;
 }

}
