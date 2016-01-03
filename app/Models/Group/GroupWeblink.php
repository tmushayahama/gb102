<?php

namespace App\Models\Group;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class GroupWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_group_weblink';
 public $timestamps = false;

 public function group() {
  return $this->belongsTo('App\Models\Group\Group', 'group_id');
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

 public static function getGroupWeblinks($groupId) {
  $groupWeblinks = GroupWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->get();
  return $groupWeblinks;
 }

 public static function getGroupWeblink($groupId, $weblinkId) {
  $groupWeblink = GroupWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $groupWeblink;
 }

 public static function createGroupWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupId = Request::get("groupId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $groupWeblink = new GroupWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $groupWeblink->group_id = $groupId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $groupWeblink->weblink()->associate($weblink);
   $groupWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupWeblink;
 }

 public static function editGroupWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupWeblinkId = Request::get("groupWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $groupWeblink = GroupWeblink::find($groupWeblinkId);
  $groupWeblink->weblink->title = $title;
  $groupWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $groupWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupWeblink;
 }

}
