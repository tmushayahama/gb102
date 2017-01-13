<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\Level\Level;
use App\Models\Component\Component;
use App\Models\User\User;
use Request;
use DB;
use JWTAuth;

class Mentorship extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship';

 public function app_type() {
  return $this->belongsTo('App\Models\AppType\AppType', 'type_id');
 }

 public function component() {
  return $this->belongsTo('App\Models\Component\Component', 'component_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function mentor() {
  return $this->belongsTo('App\Models\User\User', 'mentor_id');
 }

 public function mentee() {
  return $this->belongsTo('App\Models\User\User', 'mentee_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getMentorshipsAll() {
  $mentorships = Mentorship::orderBy('id', 'desc')
          ->with('component')
          ->with('creator')
          ->whereHas('component', function($q) {
           $q->whereNull('parent_component_id');
          })
          ->with('component.app_type')
          ->with('component.icon')
          ->with('component.level')
          ->take(100)
          ->get();
  return $mentorships;
 }

 public static function getSubMentorships($mentorshipId) {
  $mentorships = Mentorship::orderBy('id', 'desc')
          ->with('component')
          ->with('mentor')
          ->with('mentee')
          ->whereHas('component', function($q) use ($mentorshipId) {
           $q->where('parent_component_id', $mentorshipId);
          })
          ->with('component.app_type')
          ->with('component.creator')
          ->with('component.icon')
          ->with('component.level')
          ->take(100)
          ->get();
  return $mentorships;
 }

 public static function getMentorships($levelId) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $mentorships = Mentorship::where('type_id', $appId->id)
           /*
             ->whereHas('component', function($q) use ($mentorshipId) {
             $q->where('parent_component_id', $mentorshipId);
             })
            */
           ->orderBy('id', 'desc')
           ->with('component')
           ->with('component.app_type')
           ->with('component.creator')
           ->with('component.icon')
           ->with('component.level')
           ->take(100)
           ->get();
  }
  return $mentorships;
 }

 public static function getMentorshipsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorships = Mentorship::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $mentorships;
 }

 public static function getMentorship($id) {
  $mentorship = Mentorship::with('creator')
          ->with('mentor')
          ->with('mentee')
          ->with('component')
          ->with('component.app_type')
          ->with('component.creator')
          ->with('component.icon')
          ->with('component.level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $mentorship; //$mentorship;
 }

 public static function createMentorship() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipTypeId = Request::get("mentorshipTypeId");
  $mentorshipDescription = Request::get("mentorshiDescription");
  $mentorIds = Request::get("mentorIds");

  $mentorship = new Mentorship;
  $mentorship->creator_id = $userId;
  $mentorship->type_id = $mentorshipTypeId;
  $mentorship->description = $mentorshipDescription;

  DB::beginTransaction();
  try {
   foreach ($mentorIds as $mentorId) {
    $component = Component::createComponent();
    $mentorship->component_id = $component->id;
    if ($mentorshipTypeId == Level::$level_categories["mentorship_request_type"]["mentor"]) {
     $mentorship->mentor_id = $mentorId;
     $mentorship->mentee_id = $userId;
    } else {
     $mentorship->mentor_id = $userId;
     $mentorship->mentee_id = $mentorId;
    }
    $mentorship->save();
   }
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorship;
 }

 public static function editMentorship() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorship = Mentorship::find($mentorshipId);
  $mentorship->title = $title;
  $mentorship->description = $description;

  DB::beginTransaction();
  try {
   $mentorship->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorship;
 }

 /**
  * Get Request Suggestions of a mentorship
  *
  * @param type $mentorshipId
  * @param type $typeId the request type id
  * @return type json of request suggesstions
  */
 public static function getRequestSuggestions($mentorshipId, $typeId) {
  //placeholder functions
  $users = User::get();
  return $users;
 }

 public function scopeSearchByKeyword($query, $keyword) {
  if ($keyword != '') {
   $query->where(function ($query) use ($keyword) {
    $query->where("title", "LIKE", "%$keyword%")
            ->orWhere("description", "LIKE", "%$keyword%");
   });
  }
  return $query;
 }

}
