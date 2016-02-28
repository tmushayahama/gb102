<?php

namespace App\Models\Collaboration;

use Illuminate\Database\Eloquent\Model;
use App\Models\AppType\AppType;
use Request;
use DB;
use JWTAuth;

class Collaboration extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration';
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

 public static function getCollaborationsAll() {
  $collaborations = Collaboration::orderBy('id', 'desc')
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
  return $collaborations;
 }

 public static function getSubCollaborations($collaborationId) {
  $collaborations = Collaboration::orderBy('id', 'desc')
          ->with('explorer')
          ->with('mentor')
          ->with('mentee')
          ->whereHas('explorer', function($q) use ($collaborationId) {
           $q->where('parent_explorer_id', $collaborationId);
          })
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $collaborations;
 }

 public static function getCollaborations($appName) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $collaborations = Collaboration::where('app_type_id', $appId->id)
           ->orderBy('id', 'desc')
           ->with('explorer')
           ->with('explorer.app_type')
           ->with('explorer.creator')
           ->with('explorer.icon')
           ->with('explorer.level')
           ->take(100)
           ->get();
  }
  return $collaborations;
 }

 public static function getCollaborationsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborations = Collaboration::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $collaborations;
 }

 public static function getCollaboration($id) {
  $collaboration = Collaboration::with('creator')
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
  return $collaboration; //$collaboration;
 }

 public static function createCollaboration() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("app_type_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $collaboration = new Collaboration;
  $collaboration->creator_id = $userId;
  $collaboration->app_type_id = $appTypeId;
  $collaboration->title = $title;
  $collaboration->description = $description;
  $collaboration->level_id = $levelId;

  DB::beginTransaction();
  try {
   $collaboration->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaboration;
 }

 public static function editCollaboration() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaboration = Collaboration::find($collaborationId);
  $collaboration->title = $title;
  $collaboration->description = $description;

  DB::beginTransaction();
  try {
   $collaboration->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaboration;
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
