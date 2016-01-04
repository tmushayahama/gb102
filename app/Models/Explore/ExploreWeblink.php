<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class ExploreWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_weblink';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
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

 public static function getExploreWeblinks($exploreId) {
  $exploreWeblinks = ExploreWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('explore_id', $exploreId)
    ->get();
  return $exploreWeblinks;
 }

 public static function getExploreWeblink($exploreId, $weblinkId) {
  $exploreWeblink = ExploreWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('explore_id', $exploreId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $exploreWeblink;
 }

 public static function createExploreWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $exploreWeblink = new ExploreWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $exploreWeblink->explore_id = $exploreId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $exploreWeblink->weblink()->associate($weblink);
   $exploreWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreWeblink;
 }

 public static function editExploreWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreWeblinkId = Request::get("exploreWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreWeblink = ExploreWeblink::find($exploreWeblinkId);
  $exploreWeblink->weblink->title = $title;
  $exploreWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $exploreWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreWeblink;
 }

}
