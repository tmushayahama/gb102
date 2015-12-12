<?php

namespace App\Models\Promise;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class PromiseWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_promise_weblink';
 public $timestamps = false;

 public function promise() {
  return $this->belongsTo('App\Models\Promise\Promise', 'promise_id');
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

 public static function getPromiseWeblinks($promiseId) {
  $promiseWeblinks = PromiseWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->get();
  return $promiseWeblinks;
 }

 public static function getPromiseWeblink($promiseId, $weblinkId) {
  $promiseWeblink = PromiseWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $promiseWeblink;
 }

 public static function createPromiseWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseId = Request::get("promiseId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $promiseWeblink = new PromiseWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $promiseWeblink->promise_id = $promiseId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $promiseWeblink->weblink()->associate($weblink);
   $promiseWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseWeblink;
 }

 public static function editPromiseWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseWeblinkId = Request::get("promiseWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $promiseWeblink = PromiseWeblink::find($promiseWeblinkId);
  $promiseWeblink->weblink->title = $title;
  $promiseWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $promiseWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseWeblink;
 }

}
