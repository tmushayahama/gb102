<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\AppType\AppType;
use Request;
use DB;
use JWTAuth;

class Explorer extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer';

 public function app_type() {
  return $this->belongsTo('App\Models\AppType\AppType', 'app_type_id');
 }

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

 public static function getExplorersAll() {
  $explorers = Explorer::orderBy('updated_at', 'desc')
          ->with('app_type')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $explorers;
 }

 public static function getUserExplorersAll($userId) {
  $explorers = Explorer::orderBy('updated_at', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $explorers;
 }

 public static function getExplorers($appName) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $explorers = Explorer::where('app_type_id', $appId->id)
           ->orderBy('updated_at', 'desc')
           ->with('app_type')
           ->with('creator')
           ->with('icon')
           ->with('level')
           ->take(50)
           ->get();
  }
  return $explorers;
 }

 public static function getExplorersMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorers = Explorer::orderBy('id', 'desc')
          ->where('updated_at', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $explorers;
 }

 public static function getExplorer($id) {
  $explorer = Explorer::with('creator')
          ->with('app_type')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $explorer; //$explorer;
 }

 public static function createExplorer() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("app_type_id");
  $parentExplorerId = Request::get("parent_explorer_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");
  $explorerRequests = Request::get("explorer_requests");

  $explorer = new Explorer;
  $explorer->creator_id = $userId;
  $explorer->parent_explorer_id = $parentExplorerId;
  $explorer->app_type_id = $appTypeId;
  $explorer->title = $title;
  $explorer->description = $description;
  $explorer->level_id = $levelId;

  DB::beginTransaction();
  try {
   $explorer->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  ExplorerRequestOption::createExplorerRequestOption($userId, $explorer->id, $explorerRequests);
  return $explorer;
 }

 public static function editExplorer() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorer = Explorer::find($explorerId);
  $explorer->title = $title;
  $explorer->description = $description;

  DB::beginTransaction();
  try {
   $explorer->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorer;
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
