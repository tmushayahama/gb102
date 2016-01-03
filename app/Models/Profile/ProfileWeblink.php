<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class ProfileWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_profile_weblink';
 public $timestamps = false;

 public function profile() {
  return $this->belongsTo('App\Models\Profile\Profile', 'profile_id');
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

 public static function getProfileWeblinks($profileId) {
  $profileWeblinks = ProfileWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->get();
  return $profileWeblinks;
 }

 public static function getProfileWeblink($profileId, $weblinkId) {
  $profileWeblink = ProfileWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $profileWeblink;
 }

 public static function createProfileWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileId = Request::get("profileId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $profileWeblink = new ProfileWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $profileWeblink->profile_id = $profileId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $profileWeblink->weblink()->associate($weblink);
   $profileWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileWeblink;
 }

 public static function editProfileWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileWeblinkId = Request::get("profileWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $profileWeblink = ProfileWeblink::find($profileWeblinkId);
  $profileWeblink->weblink->title = $title;
  $profileWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $profileWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileWeblink;
 }

}
