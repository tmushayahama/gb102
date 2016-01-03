<?php

namespace App\Models\Group;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Group extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_group';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function icon() {
  return $this->belongsTo('App\Models\Icon\Icon', 'icon_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getGroupsAll() {
  $groups = Group::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $groups;
 }

 public static function getGroupsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groups = Group::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $groups;
 }

 public static function getGroup($id) {
  $group = Group::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $group; //$group;
 }

 public static function createGroup() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $group = new Group;
  $group->creator_id = $userId;
  $group->title = $title;
  $group->description = $description;
  $group->level_id = $levelId;

  DB::beginTransaction();
  try {
   $group->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $group;
 }

 public static function editGroup() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupId = Request::get("groupId");
  $title = Request::get("title");
  $description = Request::get("description");
  $group = Group::find($groupId);
  $group->title = $title;
  $group->description = $description;

  DB::beginTransaction();
  try {
   $group->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $group;
 }

}
