<?php

namespace App\Models\Community;

use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;
use Request;
use DB;
use JWTAuth;

class Community extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_community';

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

 public static function getUsers() {
  $users = User::orderBy('id', 'desc')
          ->take(50)
          ->get();
  return $users;
 }

 public static function createRequest() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $description = Request::get("description");
  $levelId = Request::get("level_id");
  $contributorId = Request::get("contributor_id");

  $community = new Community;
  $community->creator_id = $userId;
  $community->contributor_id = $contributorId;
  $community->description = $description;
  $community->level_id = $levelId;

  DB::beginTransaction();
  try {
   $community->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $community;
 }

 public static function getCommunitysMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communitys = Community::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $communitys;
 }

 public static function getCommunity($id) {
  $community = Community::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $community; //$community;
 }

 public static function createCommunity() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $community = new Community;
  $community->creator_id = $userId;
  $community->title = $title;
  $community->description = $description;
  $community->level_id = $levelId;

  DB::beginTransaction();
  try {
   $community->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $community;
 }

 public static function editCommunity() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityId = Request::get("communityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $community = Community::find($communityId);
  $community->title = $title;
  $community->description = $description;

  DB::beginTransaction();
  try {
   $community->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $community;
 }

}
