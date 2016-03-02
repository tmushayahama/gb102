<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class MentorshipRequestOption extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_request_option';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
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

 public static function getMentorshipRequestOptions($mentorshipId) {
  $mentorshipRequestOptions = MentorshipRequestOption::with('level')
          ->with('mentorship')
          ->orderBy('id', 'ASC')
          ->where('mentorship_id', $mentorshipId)
          ->get();
  return $mentorshipRequestOptions;
 }

 public static function getMentorshipRequestOption($mentorshipId, $requestId) {
  $mentorshipRequestOption = MentorshipRequestOption::with('request')
          ->orderBy('id', 'ASC')
          ->where('mentorship_id', $mentorshipId)
          ->where('request_id', $requestId)
          ->first();
  return $mentorshipRequestOption;
 }

 public static function createMentorshipRequestOption($userId, $mentorshipId, $mentorshipRequestOptions) {

  DB::beginTransaction();
  try {
   foreach ($mentorshipRequestOptions as $request) {
    $mentorshipRequestOption = new MentorshipRequestOption;
    $mentorshipRequestOption->creator_id = $userId;
    $mentorshipRequestOption->mentorship_id = $mentorshipId;
    $mentorshipRequestOption->level_id = $request["levelId"];
    $mentorshipRequestOption->description = $request["description"];
    $mentorshipRequestOption->save();
   }
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return true;
 }

 public static function editMentorshipRequestOption() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipRequestOptionId = Request::get("mentorshipRequestOptionId");
  //$requestId = Request::get("requestId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipRequestOption = MentorshipRequestOption::find($mentorshipRequestOptionId);
  $mentorshipRequestOption->request->title = $title;
  $mentorshipRequestOption->request->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipRequestOption->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipRequestOption;
 }

}
