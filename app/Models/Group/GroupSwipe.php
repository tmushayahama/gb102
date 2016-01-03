<?php

namespace App\Models\Group;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class GroupSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_group_swipe';
 public $timestamps = false;

 public function group() {
  return $this->belongsTo('App\Models\Group\Group', 'group_id');
 }

 public function group_modified() {
  return $this->belongsTo('App\Models\Group\Group', 'group_modified_id');
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

 public static function getGroupSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupSwipes = GroupSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('group')
          ->with('creator')
          ->with('group.creator')
          ->with('group.icon')
          ->with('group.level')
          ->take(50)
          ->get();
  return $groupSwipes;
 }

 public static function getGroupSwipe() {
  $howMany = 1;
  $groupSwipes = (new Collection(
          Group::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $groupSwipes;
 }

 public static function createGroupSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupId = Request::get("groupId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $groupSwipe = new GroupSwipe;
  $groupSwipe->creator_id = $userId;
  $groupSwipe->group_id = $groupId;
  $groupSwipe->level_id = $level_id;
  $groupSwipe->description = $description;

  DB::beginTransaction();
  try {
   $groupSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupSwipe;
 }

 public static function editGroupSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupSwipeId = Request::get("groupSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $groupSwipe = GroupSwipe::find($groupSwipeId);
  $groupSwipe->swipe->title = $title;
  $groupSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $groupSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupSwipe;
 }

}
