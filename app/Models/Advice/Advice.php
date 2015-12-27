<?php

namespace App\Models\Advice;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Advice extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_advice';

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

 public static function getAdvicesAll() {
  $advices = Advice::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(10)
          ->get();
  return $advices;
 }

 public static function getAdvicesMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $advices = Advice::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $advices;
 }

 public static function getAdvice($id) {
  $advice = Advice::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $advice; //$advice;
 }

 public static function createAdvice() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $advice = new Advice;
  $advice->creator_id = $userId;
  $advice->title = $title;
  $advice->description = $description;
  $advice->level_id = $levelId;

  DB::beginTransaction();
  try {
   $advice->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $advice;
 }

 public static function editAdvice() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceId = Request::get("adviceId");
  $title = Request::get("title");
  $description = Request::get("description");
  $advice = Advice::find($adviceId);
  $advice->title = $title;
  $advice->description = $description;

  DB::beginTransaction();
  try {
   $advice->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $advice;
 }

}
