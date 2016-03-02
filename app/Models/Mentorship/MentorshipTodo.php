<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class MentorshipTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_todo';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
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

 public static function getMentorshipTodos($mentorshipId, $levelId) {
  $mentorshipTodos = MentorshipTodo::with('todo')
          ->with('todo.status')
          ->with('todo.creator')
          ->whereHas('todo', function($q) use ($levelId) {
           $q->where('level_id', $levelId);
          })
          ->orderBy('id', 'DESC')
          ->where('mentorship_id', $mentorshipId)
          ->get();
  return $mentorshipTodos;
 }

 public static function getMentorshipTodo($mentorshipId, $todoId) {
  $mentorshipTodo = MentorshipTodo::with('todo')
          ->orderBy('id', 'DESC')
          ->where('mentorship_id', $mentorshipId)
          ->where('todo_id', $todoId)
          ->first();
  return $mentorshipTodo;
 }

 public static function createMentorshipTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $levelId = Request::get("level_id");
  $statusId = Request::get("status_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $mentorshipTodo = new MentorshipTodo;
  $todo->creator_id = $userId;
  $todo->level_id = $levelId;
  $todo->status_id = $statusId;
  $todo->title = $title;
  $todo->description = $description;
  $mentorshipTodo->mentorship_id = $mentorshipId;

  DB::beginTransaction();
  try {
   $todo->save();
   $mentorshipTodo->todo()->associate($todo);
   $mentorshipTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipTodo;
 }

 public static function editMentorshipTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipTodoId = Request::get("mentorshipTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipTodo = MentorshipTodo::find($mentorshipTodoId);
  $mentorshipTodo->todo->title = $title;
  $mentorshipTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipTodo;
 }

}
