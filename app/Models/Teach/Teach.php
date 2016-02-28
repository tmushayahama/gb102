<?php

namespace App\Models\Teach;

use Illuminate\Database\Eloquent\Model;
use App\Models\AppType\AppType;
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
 public $count = 41;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'mentor_id');
 }

 public function mentor() {
  return $this->belongsTo('App\Models\User\User', 'mentor_id');
 }

 public function mentee() {
  return $this->belongsTo('App\Models\User\User', 'mentee_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getTeachsAll() {
  $teachs = Teach::orderBy('id', 'desc')
          ->with('explorer')
          ->whereHas('explorer', function($q) {
           $q->whereNull('parent_explorer_id');
          })
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $teachs;
 }

 public static function getSubTeachs($teachId) {
  $teachs = Teach::orderBy('id', 'desc')
          ->with('explorer')
          ->with('mentor')
          ->with('mentee')
          ->whereHas('explorer', function($q) use ($teachId) {
           $q->where('parent_explorer_id', $teachId);
          })
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $teachs;
 }

 public static function getTeachs($appName) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $teachs = Teach::where('app_type_id', $appId->id)
           ->orderBy('id', 'desc')
           ->with('explorer')
           ->with('explorer.app_type')
           ->with('explorer.creator')
           ->with('explorer.icon')
           ->with('explorer.level')
           ->take(100)
           ->get();
  }
  return $teachs;
 }

 public static function getTeachsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachs = Teach::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $teachs;
 }

 public static function getTeach($id) {
  $teach = Teach::with('creator')
          ->with('mentor')
          ->with('mentee')
          ->with('explorer')
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $teach; //$teach;
 }

 public static function createTeach() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("app_type_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $teach = new Teach;
  $teach->creator_id = $userId;
  $teach->app_type_id = $appTypeId;
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

 public function scopeSearchByKeyword($query, $keyword) {
  if ($keyword != '') {
   $query->where(function ($query) use ($keyword) {
    $query->where("title", "LIKE", "%$keyword%")
            ->orWhere("description", "LIKE", "%$keyword%");
   });
  }
  return $query;
 }

}
