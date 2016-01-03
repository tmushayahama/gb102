<?php

namespace App\Models\Teach;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class TeachWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_teach_weblink';
 public $timestamps = false;

 public function teach() {
  return $this->belongsTo('App\Models\Teach\Teach', 'teach_id');
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

 public static function getTeachWeblinks($teachId) {
  $teachWeblinks = TeachWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->get();
  return $teachWeblinks;
 }

 public static function getTeachWeblink($teachId, $weblinkId) {
  $teachWeblink = TeachWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $teachWeblink;
 }

 public static function createTeachWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachId = Request::get("teachId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $teachWeblink = new TeachWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $teachWeblink->teach_id = $teachId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $teachWeblink->weblink()->associate($weblink);
   $teachWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachWeblink;
 }

 public static function editTeachWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachWeblinkId = Request::get("teachWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $teachWeblink = TeachWeblink::find($teachWeblinkId);
  $teachWeblink->weblink->title = $title;
  $teachWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $teachWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachWeblink;
 }

}
