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

 public function level() {
  return $this->belongsTo('App\Models\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getSkills() {
  $skills = Skill::orderBy('id', 'desc')
    ->with('creator')
    ->with('level')
    ->take(10)
    ->get();
  return $skills;
 }

 public static function getSkill($id) {
  $skill = Skill::with('creator')
    ->with('level')
    ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $skill; //$skill;
 }

 public static function createSkill() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $skillTodo = new SkillTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $skillTodo->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $todo->save();
   $skillTodo->todo()->associate($todo);
   $skillTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillTodo;
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
