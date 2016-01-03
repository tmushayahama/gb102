<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class JournalTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_journal_todo';
 public $timestamps = false;

 public function journal() {
  return $this->belongsTo('App\Models\Journal\Journal', 'journal_id');
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

 public static function getJournalTodos($journalId) {
  $journalTodos = JournalTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->get();
  return $journalTodos;
 }

 public static function getJournalTodo($journalId, $todoId) {
  $journalTodo = JournalTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->where('todo_id', $todoId)
    ->first();
  return $journalTodo;
 }

 public static function createJournalTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalId = Request::get("journalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $journalTodo = new JournalTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $journalTodo->journal_id = $journalId;

  DB::beginTransaction();
  try {
   $todo->save();
   $journalTodo->todo()->associate($todo);
   $journalTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalTodo;
 }

 public static function editJournalTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalTodoId = Request::get("journalTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $journalTodo = JournalTodo::find($journalTodoId);
  $journalTodo->todo->title = $title;
  $journalTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $journalTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalTodo;
 }

}
