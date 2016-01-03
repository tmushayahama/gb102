<?php

namespace App\Models\Collaboration;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class CollaborationWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration_weblink';
 public $timestamps = false;

 public function collaboration() {
  return $this->belongsTo('App\Models\Collaboration\Collaboration', 'collaboration_id');
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

 public static function getCollaborationWeblinks($collaborationId) {
  $collaborationWeblinks = CollaborationWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->get();
  return $collaborationWeblinks;
 }

 public static function getCollaborationWeblink($collaborationId, $weblinkId) {
  $collaborationWeblink = CollaborationWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $collaborationWeblink;
 }

 public static function createCollaborationWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $collaborationWeblink = new CollaborationWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $collaborationWeblink->collaboration_id = $collaborationId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $collaborationWeblink->weblink()->associate($weblink);
   $collaborationWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationWeblink;
 }

 public static function editCollaborationWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationWeblinkId = Request::get("collaborationWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaborationWeblink = CollaborationWeblink::find($collaborationWeblinkId);
  $collaborationWeblink->weblink->title = $title;
  $collaborationWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $collaborationWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationWeblink;
 }

}
