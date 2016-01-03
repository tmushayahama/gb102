<?php

namespace App\Models\Community;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class CommunityWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_community_weblink';
 public $timestamps = false;

 public function community() {
  return $this->belongsTo('App\Models\Community\Community', 'community_id');
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

 public static function getCommunityWeblinks($communityId) {
  $communityWeblinks = CommunityWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->get();
  return $communityWeblinks;
 }

 public static function getCommunityWeblink($communityId, $weblinkId) {
  $communityWeblink = CommunityWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $communityWeblink;
 }

 public static function createCommunityWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityId = Request::get("communityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $communityWeblink = new CommunityWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $communityWeblink->community_id = $communityId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $communityWeblink->weblink()->associate($weblink);
   $communityWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityWeblink;
 }

 public static function editCommunityWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityWeblinkId = Request::get("communityWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $communityWeblink = CommunityWeblink::find($communityWeblinkId);
  $communityWeblink->weblink->title = $title;
  $communityWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $communityWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityWeblink;
 }

}
