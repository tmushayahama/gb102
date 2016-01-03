<?php

namespace App\Models\Skill;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class SkillSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill_swipe';
 public $timestamps = false;

 public function skill() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_id');
 }

 public function skill_modified() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_modified_id');
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

 public static function getSkillSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillSwipes = SkillSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('skill')
          ->with('creator')
          ->with('skill.creator')
          ->with('skill.icon')
          ->with('skill.level')
          ->take(50)
          ->get();
  return $skillSwipes;
 }

 public static function getSkillSwipe() {
  $howMany = 1;
  $skillSwipes = (new Collection(
          Skill::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $skillSwipes;
 }

 public static function createSkillSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $skillSwipe = new SkillSwipe;
  $skillSwipe->creator_id = $userId;
  $skillSwipe->skill_id = $skillId;
  $skillSwipe->level_id = $level_id;
  $skillSwipe->description = $description;

  DB::beginTransaction();
  try {
   $skillSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillSwipe;
 }

 public static function editSkillSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillSwipeId = Request::get("skillSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $skillSwipe = SkillSwipe::find($skillSwipeId);
  $skillSwipe->swipe->title = $title;
  $skillSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $skillSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillSwipe;
 }

}
