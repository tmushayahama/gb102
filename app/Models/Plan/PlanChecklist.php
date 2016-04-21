<?php

namespace App\Models\Plan;

use Illuminate\Database\Eloquent\Model;
use App\Models\Checklist\Checklist;
use App\Models\Level\Level;
use App\Models\Plan\Plan;
use Request;
use DB;
use JWTAuth;

class PlanChecklist extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_plan_checklist';
 public $timestamps = false;

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function checklist() {
  return $this->belongsTo('App\Models\Checklist\Checklist', 'checklist_id');
 }

 public function plan() {
  return $this->belongsTo('App\Models\Plan\Plan', 'plan_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getPlanChecklist($planId) {
  $planChecklist = PlanChecklist::with('checklist')
          ->orderBy('id', 'DESC')
          ->where('plan_id', $planId)
          ->get();
  return $planChecklist;
 }

 public static function getPlanChecklistItem($planId, $planId) {
  $planChecklist = PlanChecklist::with('plan')
          ->with('checklist')
          ->orderBy('id', 'DESC')
          ->where('plan_id', $planId)
          ->where('plan_id', $planId)
          ->first();
  return $planChecklist;
 }

 public static function planChecklistStatusData($planId) {
  $result = array(
      'done' => PlanChecklist::planChecklistStatusCount($planId, 1),
      'total' => PlanChecklist::planChecklistCount($planId),
  );
  $result['percentage'] = PlanChecklist::planChecklistStatusPercentage($planId, $result);
  return $result;
 }

 public static function createPlanChecklist() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $planId = Request::get("planId");
  $title = Request::get("title");
  $checklist = new Checklist();
  $planChecklist = new PlanChecklist;
  $checklist->creator_id = $userId;
  $checklist->title = $title;
  $checklist->status = 0;
  $planChecklist->plan_id = $planId;

  DB::beginTransaction();
  try {
   $checklist->save();
   $planChecklist->checklist()->associate($checklist);
   $planChecklist->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $planChecklist;
 }

 public static function editPlanChecklist() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $checklistId = Request::get("checklistId");
  $title = Request::get("title");
  $planChecklist = PlanChecklist::find($checklistId);
  $planChecklist->checklist->title = $title;

  DB::beginTransaction();
  try {
   $planChecklist->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $planChecklist;
 }

 private static function planChecklistCount($planId) {
  $planChecklistCount = PlanChecklist::where('plan_id', $planId)
          ->count();
  return $planChecklistCount;
 }

 private static function planChecklistStatusCount($planId, $status) {
  $planChecklistCount = PlanChecklist::where('plan_id', $planId)
          ->whereHas('checklist', function($q) use ($status) {
           $q->where('status', $status);
          })
          ->count();
  return $planChecklistCount;
 }

 private static function planChecklistStatusPercentage($planId, $statusData) {
  $doneCount = Plan::where('id', $planId)
          ->where('status_id', Level::$level_categories['plan_status_done'])
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
