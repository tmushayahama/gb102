<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class SkillWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill_weblink';
 public $timestamps = false;

 public function skill() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_id');
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

 public static function getSkillWeblinks($skillId) {
  $skillWeblinks = SkillWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->get();
  return $skillWeblinks;
 }

 public static function getSkillWeblink($skillId, $weblinkId) {
  $skillWeblink = SkillWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $skillWeblink;
 }

 public static function createSkillWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $skillWeblink = new SkillWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $skillWeblink->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $skillWeblink->weblink()->associate($weblink);
   $skillWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillWeblink;
 }

 public static function editSkillWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillWeblinkId = Request::get("skillWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $skillWeblink = SkillWeblink::find($skillWeblinkId);
  $skillWeblink->weblink->title = $title;
  $skillWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $skillWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillWeblink;
 }

}
