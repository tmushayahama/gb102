<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProfileSection\ProfileSection;
use Request;
use DB;
use JWTAuth;

class UserProfileSection extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_user_profile_section';
 public $timestamps = false;

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function profile_section() {
  return $this->belongsTo('App\Models\Profile\ProfileSection', 'profile_section_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getUserProfileSection($userId) {
  $profileSectionProfileSection = UserProfileSection::
          where('creator_id', $userId)
          ->orderBy('id', 'ASC')
          ->with('creator')
          ->with('profile_section')
          ->get();
  return $profileSectionProfileSection;
 }

 public static function createUserProfileSection() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileSectionId = Request::get("profileSectionId");
  $description = Request::get("description");
  $userProfileSection = new UserProfileSection();
  $userProfileSection->creator_id = $userId;
  $userProfileSection->description = $description;
  $userProfileSection->profile_section_id = $profileSectionId;

  DB::beginTransaction();
  try {
   $userProfileSection->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $userProfileSection;
 }

 public static function editUserProfileSection() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $userProfileSectionId = Request::get("userProfileSectionId");
  $description = Request::get("description");
  $userProfileSection = UserProfileSection::find($userProfileSectionId);
  $userProfileSection->description = $description;

  DB::beginTransaction();
  try {
   $userProfileSection->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $userProfileSection;
 }

}
