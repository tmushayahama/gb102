<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Explore extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore';

 public function app_type() {
  return $this->belongsTo('App\Models\AppType\AppType', 'app_type_id');
 }

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

 public static function getExploresAll() {
  $explores = Explore::orderBy('id', 'desc')
          ->with('app_type')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(100)
          ->get();
  return $explores;
 }

 public static function getExploresMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explores = Explore::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $explores;
 }

 public static function getExplore($id) {
  $explore = Explore::with('creator')
          ->with('app_type')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $explore; //$explore;
 }

 public static function createExplore() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("appTypeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $explore = new Explore;
  $explore->creator_id = $userId;
  $explore->app_type_id = $appTypeId;
  $explore->title = $title;
  $explore->description = $description;
  $explore->level_id = $levelId;

  DB::beginTransaction();
  try {
   $explore->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explore;
 }

 public static function editExplore() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explore = Explore::find($exploreId);
  $explore->title = $title;
  $explore->description = $description;

  DB::beginTransaction();
  try {
   $explore->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explore;
 }

}
