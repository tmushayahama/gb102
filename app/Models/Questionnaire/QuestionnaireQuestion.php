<?php

namespace App\Models\Questionnaire;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class QuestionnaireQuestion extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_questionnaire_question';
 public $timestamps = false;

 public function question() {
  return $this->belongsTo('App\Models\Question\Question', 'question_id');
 }

 public function questionnaire() {
  return $this->belongsTo('App\Models\Questionnaire\Questionnaire', 'questionnaire_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getQuestionnaireQuestionh() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireQuestions = QuestionnaireQuestion::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('explore')
          ->with('creator')
          ->with('level')
          ->with('explore.app_type')
          ->with('explore.creator')
          ->with('explore.icon')
          ->with('explore.level')
          ->take(50)
          ->get();
  return $questionnaireQuestions;
 }

 public static function getQuestionnaireQuestion($questionnaireId) {
  $howMany = 1;
  $questionnaireQuestions = (new Collection(
          QuestionnaireQuestion::where('questionnaire_id', $questionnaireId)
          ->with('question')
          ->with('questionnaire')
          ->take(500)
          ->get()))
          ->random($howMany);
  return $questionnaireQuestions;
 }

 public static function createQuestionnaireQuestion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $questionnaireQuestion = new QuestionnaireQuestion;
  $questionnaireQuestion->creator_id = $userId;
  $questionnaireQuestion->explore_id = $exploreId;
  $questionnaireQuestion->level_id = $level_id;
  $questionnaireQuestion->description = $description;

  DB::beginTransaction();
  try {
   $questionnaireQuestion->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireQuestion;
 }

 public static function editQuestionnaireQuestion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireQuestionId = Request::get("questionnaireQuestionId");
  //$questionnaireQuestionId = Request::get("questionnaireQuestionId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaireQuestion = QuestionnaireQuestion::find($questionnaireQuestionId);
  $questionnaireQuestion->questionnaireQuestion->title = $title;
  $questionnaireQuestion->questionnaireQuestion->description = $description;

  DB::beginTransaction();
  try {
   $questionnaireQuestion->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireQuestion;
 }

}
