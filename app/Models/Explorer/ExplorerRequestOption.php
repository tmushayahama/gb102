<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ExplorerRequestOption extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_request_option';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
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

 public static function getExplorerRequestOptions($explorerId) {
  $explorerRequestOptions = ExplorerRequestOption::with('level')
          ->with('explorer')
          ->orderBy('id', 'ASC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerRequestOptions;
 }

 public static function getExplorerRequestOption($explorerId, $requestId) {
  $explorerRequestOption = ExplorerRequestOption::with('request')
          ->orderBy('id', 'ASC')
          ->where('explorer_id', $explorerId)
          ->where('request_id', $requestId)
          ->first();
  return $explorerRequestOption;
 }

 public static function createExplorerRequestOption($userId, $explorerId, $explorerRequestOptions) {

  DB::beginTransaction();
  try {
   foreach ($explorerRequestOptions as $request) {
    $explorerRequestOption = new ExplorerRequestOption;
    $explorerRequestOption->creator_id = $userId;
    $explorerRequestOption->explorer_id = $explorerId;
    $explorerRequestOption->level_id = $request["levelId"];
    $explorerRequestOption->description = $request["description"];
    $explorerRequestOption->save();
   }
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return true;
 }

 public static function editExplorerRequestOption() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerRequestOptionId = Request::get("explorerRequestOptionId");
  //$requestId = Request::get("requestId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerRequestOption = ExplorerRequestOption::find($explorerRequestOptionId);
  $explorerRequestOption->request->title = $title;
  $explorerRequestOption->request->description = $description;

  DB::beginTransaction();
  try {
   $explorerRequestOption->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerRequestOption;
 }

}
