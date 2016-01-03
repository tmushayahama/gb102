<?php

namespace App\Models\Teach;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Teach extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_teach';

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

 public static function getTeachsAll() {
  $teachs = Teach::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $teachs;
 }

 public static function getTeachsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachs = Teach::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $teachs;
 }

 public static function getTeach($id) {
  $teach = Teach::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $teach; //$teach;
 }

 public static function createTeach() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $teach = new Teach;
  $teach->creator_id = $userId;
  $teach->title = $title;
  $teach->description = $description;
  $teach->level_id = $levelId;

  DB::beginTransaction();
  try {
   $teach->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teach;
 }

 public static function editTeach() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachId = Request::get("teachId");
  $title = Request::get("title");
  $description = Request::get("description");
  $teach = Teach::find($teachId);
  $teach->title = $title;
  $teach->description = $description;

  DB::beginTransaction();
  try {
   $teach->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teach;
 }

}
