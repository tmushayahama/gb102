<?php

namespace App\Models\Question;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class QuestionAnswer extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_question_answer';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function question() {
  return $this->belongsTo('App\Models\Question\Question', 'question_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description'];

 public static function getSectionAnswers($questionId, $explorerId, $limit = 100) {
  $questions = QuestionAnswer::orderBy('id', 'desc')
          ->with('creator')
          ->where('question_id', $questionId)
          ->where('explorer_id', $explorerId)
          ->take($limit)
          ->get();
  return $questions;
 }

 public static function getAllQuestionAnswers() {
  $questions = QuestionAnswer::orderBy('id', 'desc')
          ->with('question')
          ->with('creator')
          ->with('question.creator')
          ->take(50)
          ->get();
  return $questions;
 }

 public static function getQuestionAnswers($userId) {
  if (!$userId) {
   $user = JWTAuth::parseToken()->toUser();
   $userId = $user->id;
  }
  $questions = QuestionAnswer::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('question')
          ->with('creator')
          ->with('question.creator')
          ->take(50)
          ->get();
  return $questions;
 }

 public static function getQuestionAnswer() {
  $howMany = 1;
  $explorerQuestionAnswers = (new Collection(
          Explorer::with('icon')
          ->with('creator')
          ->with('level')
          ->with('app_type')
          ->take(500)
          ->get()))
          ->random($howMany);
  return $explorerQuestionAnswers;
 }

 public static function createQuestionAnswer() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  if (!$userId) {
   return;
  }
  $explorerId = Request::get("explorer_id");
  $questionId = Request::get("question_id");
  $description = Request::get("description");
  $questionAnswer = new QuestionAnswer;
  $questionAnswer->creator_id = $userId;
  $questionAnswer->question_id = $questionId;
  $questionAnswer->explorer_id = $explorerId;
  $questionAnswer->description = $description;

  DB::beginTransaction();
  try {
   $questionAnswer->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionAnswer;
 }

 public static function editQuestionAnswer() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionId = Request::get("questionId");
  //$questionId = Request::get("questionId");
  $title = Request::get("title");
  $description = Request::get("description");
  $question = QuestionAnswer::find($questionId);
  $question->question->title = $title;
  $question->question->description = $description;

  DB::beginTransaction();
  try {
   $question->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $question;
 }

}
