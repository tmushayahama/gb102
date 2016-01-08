<?php

namespace App\Models\Questionnaire;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class QuestionnaireWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_questionnaire_weblink';
 public $timestamps = false;

 public function questionnaire() {
  return $this->belongsTo('App\Models\Questionnaire\Questionnaire', 'questionnaire_id');
 }

 public function weblink() {
  return $this->belongsTo('App\Models\Weblink\Weblink', 'weblink_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getQuestionnaireWeblinks($questionnaireId) {
  $questionnaireWeblinks = QuestionnaireWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->get();
  return $questionnaireWeblinks;
 }

 public static function getQuestionnaireWeblink($questionnaireId, $weblinkId) {
  $questionnaireWeblink = QuestionnaireWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $questionnaireWeblink;
 }

 public static function createQuestionnaireWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireId = Request::get("questionnaireId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $questionnaireWeblink = new QuestionnaireWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $questionnaireWeblink->questionnaire_id = $questionnaireId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $questionnaireWeblink->weblink()->associate($weblink);
   $questionnaireWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireWeblink;
 }

 public static function editQuestionnaireWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireWeblinkId = Request::get("questionnaireWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaireWeblink = QuestionnaireWeblink::find($questionnaireWeblinkId);
  $questionnaireWeblink->weblink->title = $title;
  $questionnaireWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $questionnaireWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireWeblink;
 }

}
