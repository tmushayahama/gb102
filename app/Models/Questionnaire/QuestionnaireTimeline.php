<?php

namespace App\Models\Questionnaire;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class QuestionnaireProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_questionnaire_progress';
 public $timestamps = false;

 public function questionnaire() {
  return $this->belongsTo('App\Models\Questionnaire\Questionnaire', 'questionnaire_id');
 }

 public function progress() {
  return $this->belongsTo('App\Models\Progress\Progress', 'progress_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getQuestionnaireProgress($questionnaireId) {
  $questionnaireProgress = QuestionnaireProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->get();
  return $questionnaireProgress;
 }

 public static function getQuestionnaireProgress($questionnaireId, $progressId) {
  $questionnaireProgress = QuestionnaireProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->where('progress_id', $progressId)
    ->first();
  return $questionnaireProgress;
 }

 public static function createQuestionnaireProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireId = Request::get("questionnaireId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $questionnaireProgress = new QuestionnaireProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $questionnaireProgress->questionnaire_id = $questionnaireId;

  DB::beginTransaction();
  try {
   $progress->save();
   $questionnaireProgress->progress()->associate($progress);
   $questionnaireProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireProgress;
 }

 public static function editQuestionnaireProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireProgressId = Request::get("questionnaireProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaireProgress = QuestionnaireProgress::find($questionnaireProgressId);
  $questionnaireProgress->progress->title = $title;
  $questionnaireProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $questionnaireProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireProgress;
 }

}
