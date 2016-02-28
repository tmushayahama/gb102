<?php

namespace App\Models\Advice;

use Illuminate\Database\Eloquent\Model;
use App\Models\AppType\AppType;
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

 public static function getAdvicesAll() {
  $advices = Advice::orderBy('id', 'desc')
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
  return $advices;
 }

 public static function getSubAdvices($adviceId) {
  $advices = Advice::orderBy('id', 'desc')
          ->with('explorer')
          ->with('mentor')
          ->with('mentee')
          ->whereHas('explorer', function($q) use ($adviceId) {
           $q->where('parent_explorer_id', $adviceId);
          })
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $advices;
 }

 public static function getAdvices($appName) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $advices = Advice::where('app_type_id', $appId->id)
           ->orderBy('id', 'desc')
           ->with('explorer')
           ->with('explorer.app_type')
           ->with('explorer.creator')
           ->with('explorer.icon')
           ->with('explorer.level')
           ->take(100)
           ->get();
  }
  return $advices;
 }

 public static function getAdvicesMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $advices = Advice::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $advices;
 }

 public static function getAdvice($id) {
  $advice = Advice::with('creator')
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
  return $advice; //$advice;
 }

 public static function createAdvice() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("app_type_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $advice = new Advice;
  $advice->creator_id = $userId;
  $advice->app_type_id = $appTypeId;
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
