<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Model;
use App\Models\Discussion\Discussion;
use Request;
use DB;
use JWTAuth;

class SkillDiscussion extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill_discussion';
 public $timestamps = false;

 public function skill() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_id');
 }

 public function discussion() {
  return $this->belongsTo('App\Models\Discussion\Discussion', 'discussion_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getSkillDiscussions($skillId) {
  $skillDiscussions = SkillDiscussion::with('discussion')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->get();
  return $skillDiscussions;
 }

 public static function createSkillDiscussion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $description = Request::get("description");
  $discussion = new Discussion;
  $skillDiscussion = new SkillDiscussion;
  $discussion->creator_id = $userId;
  $discussion->description = $description;
  $skillDiscussion->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $discussion->save();
   $skillDiscussion->discussion()->associate($discussion);
   $skillDiscussion->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillDiscussion;
 }

 public static function editSkillDiscussion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $description = Request::get("description");
  $discussion = new Discussion;
  $skillDiscussion = new SkillDiscussion;
  $discussion->creator_id = $userId;
  $discussion->description = $description;
  $skillDiscussion->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $discussion->save();
   $skillDiscussion->discussion()->associate($discussion);
   $skillDiscussion->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillDiscussion;
 }

}
