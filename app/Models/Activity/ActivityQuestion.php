<?php

namespace App\Models\Activity;

use Illuminate\Database\Eloquent\Model;
use App\Models\Question\Question;
use Request;
use DB;
use JWTAuth;

class ActivityQuestion extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_activity_question';
 public $timestamps = false;

 public function activity() {
  return $this->belongsTo('App\Models\Activity\Activity', 'activity_id');
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

 public static function getActivityQuestions($activityId) {
  $activityQuestions = ActivityQuestion::with('question')
          ->with('question.creator')
          ->orderBy('id', 'DESC')
          ->where('activity_id', $activityId)
          ->get();
  return $activityQuestions;
 }

 public static function getActivityQuestion($activityId, $questionId) {
  $activityQuestion = ActivityQuestion::with('question')
          ->with('question.creator')
          ->orderBy('id', 'DESC')
          ->where('activity_id', $activityId)
          ->where('question_id', $questionId)
          ->first();
  return $activityQuestion;
 }

 public static function createActivityQuestion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $activityId = Request::get("activityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $question = new Question;
  $activityQuestion = new ActivityQuestion;
  $question->creator_id = $userId;
  $question->title = $title;
  $question->description = $description;
  $activityQuestion->activity_id = $activityId;

  DB::beginTransaction();
  try {
   $question->save();
   $activityQuestion->question()->associate($question);
   $activityQuestion->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $activityQuestion;
 }

 public static function editActivityQuestion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $activityQuestionId = Request::get("activityQuestionId");
  //$questionId = Request::get("questionId");
  $title = Request::get("title");
  $description = Request::get("description");
  $activityQuestion = ActivityQuestion::find($activityQuestionId);
  $activityQuestion->question->title = $title;
  $activityQuestion->question->description = $description;

  DB::beginTransaction();
  try {
   $activityQuestion->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $activityQuestion;
 }

}
