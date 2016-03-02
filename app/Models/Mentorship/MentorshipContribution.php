<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\Contribution\Contribution;
use Request;
use DB;
use JWTAuth;

class MentorshipContribution extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_contribution';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
 }

 public function contribution() {
  return $this->belongsTo('App\Models\Contribution\Contribution', 'contribution_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getMentorshipContributions($mentorshipId) {
  $mentorshipContributions = MentorshipContribution::with('contribution')
          ->with('contribution.creator')
          ->with('contribution.contributor')
          ->with('contribution.level')
          ->with('contribution.status')
          ->orderBy('id', 'DESC')
          ->where('mentorship_id', $mentorshipId)
          ->get();
  return $mentorshipContributions;
 }

 public static function getMentorshipContribution($mentorshipId, $contributionId) {
  $mentorshipContribution = MentorshipContribution::with('contribution')
          ->where('mentorship_id', $mentorshipId)
          ->where('contribution_id', $contributionId)
          ->first();
  return $mentorshipContribution->level->name;
 }

 public static function getMentorshipContributionLevel($mentorshipId, $contributionId) {
  $mentorshipContribution = MentorshipContribution::with('contribution')
          ->where('mentorship_id', $mentorshipId)
          ->where('contribution_id', $contributionId)
          ->with('contribution.level')
          ->first();
  if ($mentorshipContribution != null) {
   return $mentorshipContribution;
  }
  return null;
 }

 public static function createMentorshipContribution() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorship_id");
  $description = Request::get("description");
  $levelId = Request::get("level_id");
  $contributorId = Request::get("contributor_id");
  $contribution = new Contribution;
  $mentorshipContribution = new MentorshipContribution;

  $contribution->creator_id = $userId;
  $contribution->contributor_id = $contributorId;
  $contribution->description = $description;
  $contribution->level_id = $levelId;
  $mentorshipContribution->mentorship_id = $mentorshipId;

  DB::beginTransaction();
  try {
   $contribution->save();
   $mentorshipContribution->contribution()->associate($contribution);
   $mentorshipContribution->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipContribution;
 }

 public static function editMentorshipContribution() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipContributionId = Request::get("mentorshipContributionId");
  //$contributionId = Request::get("contributionId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipContribution = MentorshipContribution::find($mentorshipContributionId);
  $mentorshipContribution->contribution->title = $title;
  $mentorshipContribution->contribution->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipContribution->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipContribution;
 }

}
