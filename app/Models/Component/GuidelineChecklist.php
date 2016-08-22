<?php

namespace App\Models\Guideline;

use Illuminate\Database\Eloquent\Model;
use App\Models\Checklist\Checklist;
use App\Models\Level\Level;
use App\Models\Guideline\Guideline;
use Request;
use DB;
use JWTAuth;

class GuidelineChecklist extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_guideline_checklist';
 public $timestamps = false;

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function checklist() {
  return $this->belongsTo('App\Models\Checklist\Checklist', 'checklist_id');
 }

 public function guideline() {
  return $this->belongsTo('App\Models\Guideline\Guideline', 'guideline_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getGuidelineChecklist($guidelineId) {
  $guidelineChecklist = GuidelineChecklist::with('checklist')
          ->orderBy('id', 'DESC')
          ->where('guideline_id', $guidelineId)
          ->get();
  return $guidelineChecklist;
 }

 public static function getGuidelineChecklistItem($guidelineId, $guidelineId) {
  $guidelineChecklist = GuidelineChecklist::with('guideline')
          ->with('checklist')
          ->orderBy('id', 'DESC')
          ->where('guideline_id', $guidelineId)
          ->where('guideline_id', $guidelineId)
          ->first();
  return $guidelineChecklist;
 }

 public static function guidelineChecklistStatusData($guidelineId) {
  $result = array(
      'done' => GuidelineChecklist::guidelineChecklistStatusCount($guidelineId, 1),
      'total' => GuidelineChecklist::guidelineChecklistCount($guidelineId),
  );
  $result['percentage'] = GuidelineChecklist::guidelineChecklistStatusPercentage($guidelineId, $result);
  return $result;
 }

 public static function createGuidelineChecklist() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $guidelineId = Request::get("guidelineId");
  $title = Request::get("title");
  $checklist = new Checklist();
  $guidelineChecklist = new GuidelineChecklist;
  $checklist->creator_id = $userId;
  $checklist->title = $title;
  $checklist->status = 0;
  $guidelineChecklist->guideline_id = $guidelineId;

  DB::beginTransaction();
  try {
   $checklist->save();
   $guidelineChecklist->checklist()->associate($checklist);
   $guidelineChecklist->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $guidelineChecklist;
 }

 public static function editGuidelineChecklist() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $checklistId = Request::get("checklistId");
  $title = Request::get("title");
  $guidelineChecklist = GuidelineChecklist::find($checklistId);
  $guidelineChecklist->checklist->title = $title;

  DB::beginTransaction();
  try {
   $guidelineChecklist->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $guidelineChecklist;
 }

 private static function guidelineChecklistCount($guidelineId) {
  $guidelineChecklistCount = GuidelineChecklist::where('guideline_id', $guidelineId)
          ->count();
  return $guidelineChecklistCount;
 }

 private static function guidelineChecklistStatusCount($guidelineId, $status) {
  $guidelineChecklistCount = GuidelineChecklist::where('guideline_id', $guidelineId)
          ->whereHas('checklist', function($q) use ($status) {
           $q->where('status', $status);
          })
          ->count();
  return $guidelineChecklistCount;
 }

 private static function guidelineChecklistStatusPercentage($guidelineId, $statusData) {
  $doneCount = Guideline::where('id', $guidelineId)
          ->where('status_id', Level::$level_categories['guideline_status_done'])
          ->count();

  if ($doneCount > 0) {
   return 100;
  }

  if ($statusData['total'] > 0) {
   return round(($statusData['done'] / $statusData['total']) * 100);
  }
  return 0;
 }

}
