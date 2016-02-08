<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ExploreRequestOption extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_request_option';
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

 public static function getExploreRequestOptions($exploreId) {
  $exploreRequestOptions = ExploreRequestOption::with('level')
          ->with('explore')
          ->orderBy('id', 'ASC')
          ->where('explore_id', $exploreId)
          ->get();
  return $exploreRequestOptions;
 }

 public static function getExploreRequestOption($exploreId, $requestId) {
  $exploreRequestOption = ExploreRequestOption::with('request')
          ->orderBy('id', 'ASC')
          ->where('explore_id', $exploreId)
          ->where('request_id', $requestId)
          ->first();
  return $exploreRequestOption;
 }

 public static function createExploreRequestOption($userId, $exploreId, $exploreRequestOptions) {

  DB::beginTransaction();
  try {
   foreach ($exploreRequestOptions as $request) {
    $exploreRequestOption = new ExploreRequestOption;
    $exploreRequestOption->creator_id = $userId;
    $exploreRequestOption->explore_id = $exploreId;
    $exploreRequestOption->level_id = $request["levelId"];
    $exploreRequestOption->description = $request["description"];
    $exploreRequestOption->save();
   }
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return true;
 }

 public static function editExploreRequestOption() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreRequestOptionId = Request::get("exploreRequestOptionId");
  //$requestId = Request::get("requestId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreRequestOption = ExploreRequestOption::find($exploreRequestOptionId);
  $exploreRequestOption->request->title = $title;
  $exploreRequestOption->request->description = $description;

  DB::beginTransaction();
  try {
   $exploreRequestOption->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreRequestOption;
 }

}
