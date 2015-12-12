<?php

namespace App\Models\Advice;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class AdviceWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_advice_weblink';
 public $timestamps = false;

 public function advice() {
  return $this->belongsTo('App\Models\Advice\Advice', 'advice_id');
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

 public static function getAdviceWeblinks($adviceId) {
  $adviceWeblinks = AdviceWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->get();
  return $adviceWeblinks;
 }

 public static function getAdviceWeblink($adviceId, $weblinkId) {
  $adviceWeblink = AdviceWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $adviceWeblink;
 }

 public static function createAdviceWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceId = Request::get("adviceId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $adviceWeblink = new AdviceWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $adviceWeblink->advice_id = $adviceId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $adviceWeblink->weblink()->associate($weblink);
   $adviceWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceWeblink;
 }

 public static function editAdviceWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceWeblinkId = Request::get("adviceWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $adviceWeblink = AdviceWeblink::find($adviceWeblinkId);
  $adviceWeblink->weblink->title = $title;
  $adviceWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $adviceWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceWeblink;
 }

}
