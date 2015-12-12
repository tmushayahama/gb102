<?php

namespace App\Models\Hobby;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class HobbyWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_hobby_weblink';
 public $timestamps = false;

 public function hobby() {
  return $this->belongsTo('App\Models\Hobby\Hobby', 'hobby_id');
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

 public static function getHobbyWeblinks($hobbyId) {
  $hobbyWeblinks = HobbyWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->get();
  return $hobbyWeblinks;
 }

 public static function getHobbyWeblink($hobbyId, $weblinkId) {
  $hobbyWeblink = HobbyWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $hobbyWeblink;
 }

 public static function createHobbyWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyId = Request::get("hobbyId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $hobbyWeblink = new HobbyWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $hobbyWeblink->hobby_id = $hobbyId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $hobbyWeblink->weblink()->associate($weblink);
   $hobbyWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyWeblink;
 }

 public static function editHobbyWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyWeblinkId = Request::get("hobbyWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $hobbyWeblink = HobbyWeblink::find($hobbyWeblinkId);
  $hobbyWeblink->weblink->title = $title;
  $hobbyWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $hobbyWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyWeblink;
 }

}
