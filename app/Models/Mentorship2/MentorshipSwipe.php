<?php

namespace App\Models\Mentorship;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class MentorshipSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_swipe';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
 }

 public function mentorship_modified() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_modified_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getMentorshipSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipSwipes = MentorshipSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('mentorship')
          ->with('creator')
          ->with('mentorship.creator')
          ->with('mentorship.icon')
          ->with('mentorship.level')
          ->take(50)
          ->get();
  return $mentorshipSwipes;
 }

 public static function getMentorshipSwipe() {
  $howMany = 1;
  $mentorshipSwipes = (new Collection(
          Mentorship::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $mentorshipSwipes;
 }

 public static function createMentorshipSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $mentorshipSwipe = new MentorshipSwipe;
  $mentorshipSwipe->creator_id = $userId;
  $mentorshipSwipe->mentorship_id = $mentorshipId;
  $mentorshipSwipe->level_id = $level_id;
  $mentorshipSwipe->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipSwipe;
 }

 public static function editMentorshipSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipSwipeId = Request::get("mentorshipSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipSwipe = MentorshipSwipe::find($mentorshipSwipeId);
  $mentorshipSwipe->swipe->title = $title;
  $mentorshipSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipSwipe;
 }

}
