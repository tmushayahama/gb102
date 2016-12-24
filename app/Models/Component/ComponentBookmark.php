<?php

namespace App\Models\Component;

use Illuminate\Database\Eloquent\Model;
use App\Models\Level\Level;
use Request;
use DB;
use JWTAuth;

class ComponentBookmark extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_component_bookmark';

 public function component() {
  return $this->belongsTo('App\Models\Component\Component', 'component_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 public function status() {
  return $this->belongsTo('App\Models\Level\Level', 'status_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

 /**
  * Get All Bookmarks selected by the user
  *
  * @return type
  */
 public static function getComponentBookmarks() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $componentBookmarks = ComponentBookmark::
          where('creator_id', $userId)
          ->with('component')
          ->with('creator')
          ->with('level')
          ->with('status')
          ->orderBy('id', 'DESC')
          ->get();
  return $componentBookmarks;
 }

 /**
  * Creates a bookmark for the component
  *
  */
 public static function createComponentBookmark() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $componentId = Request::get("componentId");
  $levelId = Request::get("levelId");
  $privacyId = Level::$level_categories["privacy"]["public"];
  $componentBookmark = new ComponentBookmark();
  $componentBookmark->creator_id = $userId;
  $componentBookmark->level_id = $levelId;
  $componentBookmark->privacy_id = $privacyId;
  $componentBookmark->component_id = $componentId;

  DB::beginTransaction();
  try {
   $componentBookmark->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $componentBookmark;
 }

 public static function getBookmarkStats($userId) {
  $bookmarksCount = ComponentBookmark::where('contributor_id', $userId)
          ->count();
  return array('totalCount' => $bookmarksCount);
 }

}
