<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Plan\Plan;
use Request;
use DB;
use JWTAuth;

class ExplorerPlan extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_plan';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
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

 public static function getExplorerPlans($explorerId) {
  $explorerPlans = ExplorerPlan::with('plan')
          ->with('plan.objective')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerPlans;
 }

 public static function getExplorerPlan($explorerId, $planId) {
  $explorerPlan = ExplorerPlan::with('plan')
          ->with('plan.objective')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->where('plan_id', $planId)
          ->first();
  return $explorerPlan;
 }

 public static function createExplorerPlan() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $plan = new Plan;
  $explorerPlan = new ExplorerPlan;
  $plan->creator_id = $userId;
  $plan->title = $title;
  $plan->description = $description;
  $explorerPlan->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $plan->save();
   $explorerPlan->plan()->associate($plan);
   $explorerPlan->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerPlan;
 }

 public static function editExplorerPlan() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerPlanId = Request::get("explorerPlanId");
  //$planId = Request::get("planId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerPlan = ExplorerPlan::find($explorerPlanId);
  $explorerPlan->plan->title = $title;
  $explorerPlan->plan->description = $description;

  DB::beginTransaction();
  try {
   $explorerPlan->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerPlan;
 }

}
