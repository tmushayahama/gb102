<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Profile extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_profile';

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

 public static function getProfilesAll() {
  $profiles = Profile::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $profiles;
 }

 public static function getProfilesMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profiles = Profile::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $profiles;
 }

 public static function getProfile($id) {
  $profile = Profile::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $profile; //$profile;
 }

 public static function createProfile() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $profile = new Profile;
  $profile->creator_id = $userId;
  $profile->title = $title;
  $profile->description = $description;
  $profile->level_id = $levelId;

  DB::beginTransaction();
  try {
   $profile->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profile;
 }

 public static function editProfile() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileId = Request::get("profileId");
  $title = Request::get("title");
  $description = Request::get("description");
  $profile = Profile::find($profileId);
  $profile->title = $title;
  $profile->description = $description;

  DB::beginTransaction();
  try {
   $profile->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profile;
 }

}
