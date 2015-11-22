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

}
