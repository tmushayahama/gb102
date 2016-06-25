<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Question\Question;
use Request;
use DB;
use JWTAuth;

class ExplorerQuestion extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_question';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function question() {
  return $this->belongsTo('App\Models\Question\Question', 'question_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerQuestions($explorerId, $type) {
  $explorerQuestions = ExplorerQuestion::with('question')
          ->with('question.creator')
          ->whereHas('question', function($q) {
           //$q->whereNull('parent_question_id');
          })
          ->orderBy('id', 'asc')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerQuestions;
 }

 public static function getExplorerQuestion($explorerId, $questionsId) {
  $explorerQuestion = ExplorerQuestion::with('question')
          ->orderBy('id', 'asc')
          ->with('question.creator')
          ->where('explorer_id', $explorerId)
          ->where('question_id', $questionsId)
          ->first();
  return $explorerQuestion;
 }

 public static function createExplorerQuestion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questions = new Question;
  $explorerQuestion = new ExplorerQuestion;
  $questions->creator_id = $userId;
  $questions->title = $title;
  $questions->description = $description;
  $explorerQuestion->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $questions->save();
   $explorerQuestion->questions()->associate($questions);
   $explorerQuestion->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerQuestion;
 }

 public static function editExplorerQuestion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerQuestionId = Request::get("explorerQuestionId");
  //$questionsId = Request::get("questionsId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerQuestion = ExplorerQuestion::find($explorerQuestionId);
  $explorerQuestion->questions->title = $title;
  $explorerQuestion->questions->description = $description;

  DB::beginTransaction();
  try {
   $explorerQuestion->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerQuestion;
 }

}
