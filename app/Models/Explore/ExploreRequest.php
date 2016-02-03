<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ExploreRequest extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_request';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExploreRequests($exploreId) {
  $exploreRequests = ExploreRequest::with('request')
          ->with('request.creator')
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->get();
  return $exploreRequests;
 }

 public static function getExploreRequest($exploreId, $requestId) {
  $exploreRequest = ExploreRequest::with('request')
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->where('request_id', $requestId)
          ->first();
  return $exploreRequest;
 }

 public static function createExploreRequest($userId, $exploreId, $exploreRequests) {

  DB::beginTransaction();
  try {
   foreach ($exploreRequests as $request) {
    $exploreRequest = new ExploreRequest;
    $exploreRequest->creator_id = $userId;
    $exploreRequest->explore_id = $exploreId;
    $exploreRequest->level_id = $request["levelId"];
    $exploreRequest->description = $request["description"];
    $exploreRequest->save();
   }
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return true;
 }

 public static function editExploreRequest() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreRequestId = Request::get("exploreRequestId");
  //$requestId = Request::get("requestId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreRequest = ExploreRequest::find($exploreRequestId);
  $exploreRequest->request->title = $title;
  $exploreRequest->request->description = $description;

  DB::beginTransaction();
  try {
   $exploreRequest->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreRequest;
 }

}
