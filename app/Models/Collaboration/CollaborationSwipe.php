<?php

namespace App\Models\Collaboration;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class CollaborationSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration_swipe';
 public $timestamps = false;

 public function collaboration() {
  return $this->belongsTo('App\Models\Collaboration\Collaboration', 'collaboration_id');
 }

 public function collaboration_modified() {
  return $this->belongsTo('App\Models\Collaboration\Collaboration', 'collaboration_modified_id');
 }

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

 public static function getCollaborationSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationSwipes = CollaborationSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('collaboration')
          ->with('creator')
          ->with('collaboration.creator')
          ->with('collaboration.icon')
          ->with('collaboration.level')
          ->take(50)
          ->get();
  return $collaborationSwipes;
 }

 public static function getCollaborationSwipe() {
  $howMany = 1;
  $collaborationSwipes = (new Collection(
          Collaboration::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $collaborationSwipes;
 }

 public static function createCollaborationSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $collaborationSwipe = new CollaborationSwipe;
  $collaborationSwipe->creator_id = $userId;
  $collaborationSwipe->collaboration_id = $collaborationId;
  $collaborationSwipe->level_id = $level_id;
  $collaborationSwipe->description = $description;

  DB::beginTransaction();
  try {
   $collaborationSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationSwipe;
 }

 public static function editCollaborationSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationSwipeId = Request::get("collaborationSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaborationSwipe = CollaborationSwipe::find($collaborationSwipeId);
  $collaborationSwipe->swipe->title = $title;
  $collaborationSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $collaborationSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationSwipe;
 }

}
