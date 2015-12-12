<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class MentorshipWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_weblink';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
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

 public static function getMentorshipWeblinks($mentorshipId) {
  $mentorshipWeblinks = MentorshipWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->get();
  return $mentorshipWeblinks;
 }

 public static function getMentorshipWeblink($mentorshipId, $weblinkId) {
  $mentorshipWeblink = MentorshipWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $mentorshipWeblink;
 }

 public static function createMentorshipWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $mentorshipWeblink = new MentorshipWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $mentorshipWeblink->mentorship_id = $mentorshipId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $mentorshipWeblink->weblink()->associate($weblink);
   $mentorshipWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipWeblink;
 }

 public static function editMentorshipWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipWeblinkId = Request::get("mentorshipWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipWeblink = MentorshipWeblink::find($mentorshipWeblinkId);
  $mentorshipWeblink->weblink->title = $title;
  $mentorshipWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipWeblink;
 }

}
