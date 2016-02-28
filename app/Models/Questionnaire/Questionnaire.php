<?php

namespace App\Models\Questionnaire;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Questionnaire extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_questionnaire';
 public $timestamps = false;

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getQuestionAnswers() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaires = Questionnaire::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('explorer')
          ->with('creator')
          ->with('level')
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(50)
          ->get();
  return $questionnaires;
 }

 public static function getQuestionnaire() {
  $howMany = 1;
  $explorerQuestionnaires = (new Collection(
          Explorer::with('icon')
          ->with('creator')
          ->with('level')
          ->with('app_type')
          ->take(500)
          ->get()))
          ->random($howMany);
  return $explorerQuestionnaires;
 }

 public static function createQuestionnaire() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $questionnaire = new Questionnaire;
  $questionnaire->creator_id = $userId;
  $questionnaire->explorer_id = $explorerId;
  $questionnaire->level_id = $level_id;
  $questionnaire->description = $description;

  DB::beginTransaction();
  try {
   $questionnaire->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaire;
 }

 public static function editQuestionnaire() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireId = Request::get("questionnaireId");
  //$questionnaireId = Request::get("questionnaireId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaire = Questionnaire::find($questionnaireId);
  $questionnaire->questionnaire->title = $title;
  $questionnaire->questionnaire->description = $description;

  DB::beginTransaction();
  try {
   $questionnaire->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaire;
 }

}
