<?php

namespace App\Models\Questionnaire;

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

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function icon() {
  return $this->belongsTo('App\Models\Icon\Icon', 'icon_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getQuestionnairesAll() {
  $questionnaires = Questionnaire::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $questionnaires;
 }

 public static function getQuestionnairesMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaires = Questionnaire::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $questionnaires;
 }

 public static function getQuestionnaire($id) {
  $questionnaire = Questionnaire::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $questionnaire; //$questionnaire;
 }

 public static function createQuestionnaire() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $questionnaire = new Questionnaire;
  $questionnaire->creator_id = $userId;
  $questionnaire->title = $title;
  $questionnaire->description = $description;
  $questionnaire->level_id = $levelId;

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
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaire = Questionnaire::find($questionnaireId);
  $questionnaire->title = $title;
  $questionnaire->description = $description;

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
