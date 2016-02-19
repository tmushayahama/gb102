<?php

namespace App\Models\Community;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class CommunityProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_community_progress';
 public $timestamps = false;

 public function community() {
  return $this->belongsTo('App\Models\Community\Community', 'community_id');
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

 public static function getCommunityProgress($communityId) {
  $communityProgress = CommunityProgress::with('progress')
          ->with('progress.creator')
          ->orderBy('id', 'DESC')
          ->where('community_id', $communityId)
          ->get();
  return $communityProgress;
 }

 public static function getCommunityProgressItem($communityId, $progressId) {
  $communityProgress = CommunityProgress::with('progress')
          ->orderBy('id', 'DESC')
          ->where('community_id', $communityId)
          ->where('progress_id', $progressId)
          ->first();
  return $communityProgress;
 }

 public static function createCommunityProgressItem() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityId = Request::get("communityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $communityProgress = new CommunityProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $communityProgress->community_id = $communityId;

  DB::beginTransaction();
  try {
   $progress->save();
   $communityProgress->progress()->associate($progress);
   $communityProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityProgress;
 }

 public static function editCommunityProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityProgressId = Request::get("communityProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $communityProgress = CommunityProgress::find($communityProgressId);
  $communityProgress->progress->title = $title;
  $communityProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $communityProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityProgress;
 }

}
