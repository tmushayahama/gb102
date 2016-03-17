<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\AppType\AppType;
use App\Models\Explorer\Explorer;
use Request;
use DB;
use JWTAuth;

class Mentorship extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship';

 public function app_type() {
  return $this->belongsTo('App\Models\AppType\AppType', 'app_type_id');
 }

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
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

 public static function getMentorshipsAll() {
  $mentorships = Mentorship::orderBy('updated_at', 'desc')
          ->with('explorer.app_type')
          ->with('explorer.level')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $mentorships;
 }

 public static function getUserMentorshipsAll($userId) {
  $mentorships = Mentorship::orderBy('updated_at', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $mentorships;
 }

 public static function getMentorships($appName) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $mentorships = Mentorship::where('app_type_id', $appId->id)
           ->orderBy('updated_at', 'desc')
           ->with('app_type')
           ->with('creator')
           ->with('icon')
           ->with('level')
           ->take(50)
           ->get();
  }
  return $mentorships;
 }

 public static function getMentorshipsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorships = Mentorship::orderBy('id', 'desc')
          ->where('updated_at', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $mentorships;
 }

 public static function getMentorship($id) {
  $mentorship = Mentorship::with('creator')
          ->with('app_type')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $mentorship; //$mentorship;
 }

 public static function createMentorship() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("app_type_id");
  $parentMentorshipId = Request::get("parent_mentorship_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");
  $mentorshipRequests = Request::get("mentorship_requests");

  $mentorship = new Mentorship;
  $mentorship->creator_id = $userId;
  $mentorship->parent_mentorship_id = $parentMentorshipId;
  $mentorship->app_type_id = $appTypeId;
  $mentorship->title = $title;
  $mentorship->description = $description;
  $mentorship->level_id = $levelId;

  DB::beginTransaction();
  try {
   $mentorship->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  MentorshipRequestOption::createMentorshipRequestOption($userId, $mentorship->id, $mentorshipRequests);
  return $mentorship;
 }

 public static function editMentorship() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorship = Mentorship::find($mentorshipId);
  $mentorship->title = $title;
  $mentorship->description = $description;

  DB::beginTransaction();
  try {
   $mentorship->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorship;
 }

 public function scopeSearchByKeyword($query, $keyword) {
  if ($keyword != '') {
   $query->where(function ($query) use ($keyword) {
    $query->where("title", "LIKE", "%$keyword%")
            ->orWhere("description", "LIKE", "%$keyword%");
   });
  }
  return $query;
 }

}
