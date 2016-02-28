<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class ExplorerWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_weblink';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function weblink() {
  return $this->belongsTo('App\Models\Weblink\Weblink', 'weblink_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerWeblinks($explorerId) {
  $explorerWeblinks = ExplorerWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('explorer_id', $explorerId)
    ->get();
  return $explorerWeblinks;
 }

 public static function getExplorerWeblink($explorerId, $weblinkId) {
  $explorerWeblink = ExplorerWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('explorer_id', $explorerId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $explorerWeblink;
 }

 public static function createExplorerWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $explorerWeblink = new ExplorerWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $explorerWeblink->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $explorerWeblink->weblink()->associate($weblink);
   $explorerWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerWeblink;
 }

 public static function editExplorerWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerWeblinkId = Request::get("explorerWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerWeblink = ExplorerWeblink::find($explorerWeblinkId);
  $explorerWeblink->weblink->title = $title;
  $explorerWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $explorerWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerWeblink;
 }

}
