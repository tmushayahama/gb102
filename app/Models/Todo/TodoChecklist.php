<?php

namespace App\Models\Todo;

use Illuminate\Database\Eloquent\Model;

class TodoChecklist extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_todo_checklist';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function checklist() {
  return $this->belongsTo('App\Models\Checklist\Checklist', 'checklist_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getTodoChecklist($todoId) {
  $todoChecklist = TodoChecklist::with('todo')
    ->orderBy('id', 'DESC')
    ->where('todo_id', $todoId)
    ->get();
  return $todoChecklist;
 }

 public static function getTodoChecklist($todoId, $todoId) {
  $todoChecklist = TodoChecklist::with('todo')
    ->orderBy('id', 'DESC')
    ->where('todo_id', $todoId)
    ->where('todo_id', $todoId)
    ->first();
  return $todoChecklist;
 }

 public static function createTodoChecklist() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $todoId = Request::get("todoId");
  $description = Request::get("description");
  $todo = new Todo;
  $todoChecklist = new TodoChecklist;
  $todo->creator_id = $userId;
  $todo->description = $description;
  $todoChecklist->todo_id = $todoId;

  DB::beginTransaction();
  try {
   $todo->save();
   $todoChecklist->todo()->associate($todo);
   $todoChecklist->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $todoChecklist;
 }

 public static function editTodoChecklist() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $todoId = Request::get("todoId");
  $description = Request::get("description");
  $todo = new Todo;
  $todoChecklist = new TodoChecklist;
  $todo->creator_id = $userId;
  $todo->description = $description;
  $todoChecklist->todo_id = $todoId;

  DB::beginTransaction();
  try {
   $todo->save();
   $todoChecklist->todo()->associate($todo);
   $todoChecklist->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $todoChecklist;
 }

}
