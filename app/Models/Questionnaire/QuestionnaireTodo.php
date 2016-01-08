<?php

namespace App\Models\Questionnaire;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class QuestionnaireTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_questionnaire_todo';
 public $timestamps = false;

 public function questionnaire() {
  return $this->belongsTo('App\Models\Questionnaire\Questionnaire', 'questionnaire_id');
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

 public static function getQuestionnaireTodos($questionnaireId) {
  $questionnaireTodos = QuestionnaireTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->get();
  return $questionnaireTodos;
 }

 public static function getQuestionnaireTodo($questionnaireId, $todoId) {
  $questionnaireTodo = QuestionnaireTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->where('todo_id', $todoId)
    ->first();
  return $questionnaireTodo;
 }

 public static function createQuestionnaireTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireId = Request::get("questionnaireId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $questionnaireTodo = new QuestionnaireTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $questionnaireTodo->questionnaire_id = $questionnaireId;

  DB::beginTransaction();
  try {
   $todo->save();
   $questionnaireTodo->todo()->associate($todo);
   $questionnaireTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireTodo;
 }

 public static function editQuestionnaireTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireTodoId = Request::get("questionnaireTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaireTodo = QuestionnaireTodo::find($questionnaireTodoId);
  $questionnaireTodo->todo->title = $title;
  $questionnaireTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $questionnaireTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireTodo;
 }

}
