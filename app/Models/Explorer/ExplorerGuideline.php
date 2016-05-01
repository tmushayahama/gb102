<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Guideline\Guideline;
use Request;
use DB;
use JWTAuth;

class ExplorerGuideline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_guideline';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
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

 public static function getExplorerGuidelines($explorerId) {
  $explorerGuidelines = ExplorerGuideline::with('guideline')
          ->with('guideline.creator')
          ->whereHas('guideline', function($q) {
           $q->whereNull('parent_guideline_id');
          })
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerGuidelines;
 }

 public static function getExplorerGuideline($explorerId, $guidelineId) {
  $explorerGuideline = ExplorerGuideline::with('guideline')
          ->orderBy('id', 'DESC')
          ->with('guideline.creator')
          ->where('explorer_id', $explorerId)
          ->where('guideline_id', $guidelineId)
          ->first();
  return $explorerGuideline;
 }

 public static function createExplorerGuideline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $guideline = new Guideline;
  $explorerGuideline = new ExplorerGuideline;
  $guideline->creator_id = $userId;
  $guideline->title = $title;
  $guideline->description = $description;
  $explorerGuideline->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $guideline->save();
   $explorerGuideline->guideline()->associate($guideline);
   $explorerGuideline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerGuideline;
 }

 public static function editExplorerGuideline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerGuidelineId = Request::get("explorerGuidelineId");
  //$guidelineId = Request::get("guidelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerGuideline = ExplorerGuideline::find($explorerGuidelineId);
  $explorerGuideline->guideline->title = $title;
  $explorerGuideline->guideline->description = $description;

  DB::beginTransaction();
  try {
   $explorerGuideline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerGuideline;
 }

}
