<?php

namespace App\Models\Hobby;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Hobby extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_hobby';

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
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getHobbysAll() {
  $hobbys = Hobby::orderBy('id', 'desc')
    ->with('creator')
    ->with('level')
    ->take(10)
    ->get();
  return $hobbys;
 }

 public static function getHobbysMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbys = Hobby::orderBy('id', 'desc')
    ->where('creator_id', $userId)
    ->with('creator')
    ->with('level')
    ->take(10)
    ->get();
  return $hobbys;
 }

 public static function getHobby($id) {
  $hobby = Hobby::with('creator')
    ->with('level')
    ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $hobby; //$hobby;
 }

 public static function createHobby() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $hobby = new Hobby;
  $hobby->creator_id = $userId;
  $hobby->title = $title;
  $hobby->description = $description;
  $hobby->level_id = $levelId;

  DB::beginTransaction();
  try {
   $hobby->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobby;
 }

 public static function editHobby() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyId = Request::get("hobbyId");
  $title = Request::get("title");
  $description = Request::get("description");
  $hobby = Hobby::find($hobbyId);
  $hobby->title = $title;
  $hobby->description = $description;

  DB::beginTransaction();
  try {
   $hobby->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobby;
 }

}
