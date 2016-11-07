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
  return $this->belongsTo('App\Models\AppType\AppType', 'type_id');
 }

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function mentor() {
  return $this->belongsTo('App\Models\User\User', 'mentor_id');
 }

 public function mentee() {
  return $this->belongsTo('App\Models\User\User', 'mentee_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getMentorshipsAll() {
  $mentorships = Mentorship::orderBy('id', 'desc')
          ->with('explorer')
          ->with('creator')
          ->whereHas('explorer', function($q) {
           $q->whereNull('parent_explorer_id');
          })
          ->with('explorer.app_type')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $mentorships;
 }

 public static function getSubMentorships($mentorshipId) {
  $mentorships = Mentorship::orderBy('id', 'desc')
          ->with('explorer')
          ->with('mentor')
          ->with('mentee')
          ->whereHas('explorer', function($q) use ($mentorshipId) {
           $q->where('parent_explorer_id', $mentorshipId);
          })
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $mentorships;
 }

 public static function getMentorships($levelId) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $mentorships = Mentorship::where('type_id', $appId->id)
           /*
             ->whereHas('explorer', function($q) use ($mentorshipId) {
             $q->where('parent_explorer_id', $mentorshipId);
             })
            */
           ->orderBy('id', 'desc')
           ->with('explorer')
           ->with('explorer.app_type')
           ->with('explorer.creator')
           ->with('explorer.icon')
           ->with('explorer.level')
           ->take(100)
           ->get();
  }
  return $mentorships;
 }

 public static function getMentorshipsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorships = Mentorship::orderBy('id', 'desc')
          ->where('creator_id', $userId)
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
          ->with('mentor')
          ->with('mentee')
          ->with('explorer')
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $mentorship; //$mentorship;
 }

 public static function createMentorship() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("type_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $mentorship = new Mentorship;
  $mentorship->creator_id = $userId;
  $mentorship->type_id = $appTypeId;
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
