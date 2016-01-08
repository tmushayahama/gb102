<?php

namespace App\Models\Questionnaire;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class QuestionnaireTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_questionnaire_timeline';
 public $timestamps = false;

 public function questionnaire() {
  return $this->belongsTo('App\Models\Questionnaire\Questionnaire', 'questionnaire_id');
 }

 public function timeline() {
  return $this->belongsTo('App\Models\Timeline\Timeline', 'timeline_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getQuestionnaireTimelines($questionnaireId) {
  $questionnaireTimelines = QuestionnaireTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->get();
  return $questionnaireTimelines;
 }

 public static function getQuestionnaireTimeline($questionnaireId, $timelineId) {
  $questionnaireTimeline = QuestionnaireTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $questionnaireTimeline;
 }

 public static function createQuestionnaireTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireId = Request::get("questionnaireId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $questionnaireTimeline = new QuestionnaireTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $questionnaireTimeline->questionnaire_id = $questionnaireId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $questionnaireTimeline->timeline()->associate($timeline);
   $questionnaireTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireTimeline;
 }

 public static function editQuestionnaireTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireTimelineId = Request::get("questionnaireTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaireTimeline = QuestionnaireTimeline::find($questionnaireTimelineId);
  $questionnaireTimeline->timeline->title = $title;
  $questionnaireTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $questionnaireTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireTimeline;
 }

}
