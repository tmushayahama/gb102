<?php

namespace App\Models\Swipe;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class SwipeWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_swipe_weblink';
 public $timestamps = false;

 public function swipe() {
  return $this->belongsTo('App\Models\Swipe\Swipe', 'swipe_id');
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

 public static function getSwipeWeblinks($swipeId) {
  $swipeWeblinks = SwipeWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->get();
  return $swipeWeblinks;
 }

 public static function getSwipeWeblink($swipeId, $weblinkId) {
  $swipeWeblink = SwipeWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $swipeWeblink;
 }

 public static function createSwipeWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $swipeWeblink = new SwipeWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $swipeWeblink->swipe_id = $swipeId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $swipeWeblink->weblink()->associate($weblink);
   $swipeWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeWeblink;
 }

 public static function editSwipeWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeWeblinkId = Request::get("swipeWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $swipeWeblink = SwipeWeblink::find($swipeWeblinkId);
  $swipeWeblink->weblink->title = $title;
  $swipeWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $swipeWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeWeblink;
 }

}
