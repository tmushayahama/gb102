<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class SkillTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill_todo';
 public $timestamps = false;

 public function skill() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_id');
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

 public static function getSkillTodos($skillId) {
  $skillTodos = SkillTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->get();
  return $skillTodos;
 }

 public static function getSkillTodo($skillId, $todoId) {
  $skillTodo = SkillTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->where('todo_id', $todoId)
    ->first();
  return $skillTodo;
 }

 public static function createSkillTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $skillTodo = new SkillTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $skillTodo->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $todo->save();
   $skillTodo->todo()->associate($todo);
   $skillTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillTodo;
 }

 public static function editSkillTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillTodoId = Request::get("skill_todo_id");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $skillTodo = SkillTodo::find($skillTodoId);
  $skillTodo->todo->title = $title;
  $skillTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $skillTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillTodo;
 }

}
