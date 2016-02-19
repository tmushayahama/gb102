<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class MentorshipProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_progress';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
 }

 public function progress() {
  return $this->belongsTo('App\Models\Progress\Progress', 'progress_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getMentorshipProgress($mentorshipId) {
  $mentorshipProgress = MentorshipProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->get();
  return $mentorshipProgress;
 }

 public static function getMentorshipProgress($mentorshipId, $progressId) {
  $mentorshipProgress = MentorshipProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->where('progress_id', $progressId)
    ->first();
  return $mentorshipProgress;
 }

 public static function createMentorshipProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $mentorshipProgress = new MentorshipProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $mentorshipProgress->mentorship_id = $mentorshipId;

  DB::beginTransaction();
  try {
   $progress->save();
   $mentorshipProgress->progress()->associate($progress);
   $mentorshipProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipProgress;
 }

 public static function editMentorshipProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipProgressId = Request::get("mentorshipProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipProgress = MentorshipProgress::find($mentorshipProgressId);
  $mentorshipProgress->progress->title = $title;
  $mentorshipProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipProgress;
 }

}
