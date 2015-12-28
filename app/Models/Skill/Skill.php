<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Skill extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill';

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

 public static function getSkillsAll() {
  $skills = Skill::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $skills;
 }

 public static function getSkillsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skills = Skill::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $skills;
 }

 public static function getSkill($id) {
  $skill = Skill::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $skill; //$skill;
 }

 public static function createSkill() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $skill = new Skill;
  $skill->creator_id = $userId;
  $skill->title = $title;
  $skill->description = $description;
  $skill->level_id = $levelId;

  DB::beginTransaction();
  try {
   $skill->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skill;
 }

 public static function editSkill() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $title = Request::get("title");
  $description = Request::get("description");
  $skill = Skill::find($skillId);
  $skill->title = $title;
  $skill->description = $description;

  DB::beginTransaction();
  try {
   $skill->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skill;
 }

}
