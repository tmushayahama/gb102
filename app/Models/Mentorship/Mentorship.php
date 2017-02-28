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

 public function type() {
  return $this->belongsTo('App\Models\Level\Level', 'type_id');
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

 public function status() {
  return $this->belongsTo('App\Models\Level\Level', 'status_id');
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

 /**
  * Ge mentorship of a given component
  *
  * @param type $componentId
  * @return mentorships
  */
 public static function getMentorships($componentId) {
  $mentorships = Mentorship::orderBy('id', 'desc')
          ->with('component')
          ->with('mentor')
          ->with('mentee')
          ->with('creator')
          ->with('status')
          ->whereHas('component', function($q) use ($componentId) {
           $q->where('parent_component_id', $componentId);
          })
          ->with('component.type')
          ->take(20)
          ->get();
  return $mentorships;
 }

 public static function getMentorship($id) {
  $mentorship = Mentorship::with('creator')
          ->with('mentor')
          ->with('mentee')
          ->find($id);

  if ($mentorship) {
   $mentorshipAppTypes = Level::getSubLevels(Level::$level_categories['mentorship_app_type']);
   $mentorship["component"] = Component::getComponent($mentorship->component_id, Level::$componentJsonFormat["types"], 2);
   $mentorship["component"]["mentorshipApps"] = Component::formatSubComponentByType($mentorship->component_id, $mentorshipAppTypes);
  }

  return $mentorship;
 }

 public static function createMentorship() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipTypeId = Request::get("mentorshipTypeId");
  $mentorshipDescription = Request::get("mentorshiDescription");
  $mentorIds = Request::get("mentorIds");
  $result = array();
  DB::beginTransaction();
  try {
   foreach ($mentorIds as $mentorId) {
    $mentorship = new Mentorship;
    $component = Component::createComponent();
    $mentorship->creator_id = $userId;
    $mentorship->type_id = $mentorshipTypeId;
    $mentorship->status_id = Level::$level_categories["mentorship_status"]["pending"];
    $mentorship->description = $mentorshipDescription;
    $mentorship->component_id = $component->id;
    if ($mentorshipTypeId == Level::$level_categories["mentorship_request_type"]["mentor"]) {
     $mentorship->mentor_id = $mentorId;
     $mentorship->mentee_id = $userId;
    } else {
     $mentorship->mentor_id = $userId;
     $mentorship->mentee_id = $mentorId;
    }
    $mentorship->save();
    array_push($result, $mentorship);
   }
  } catch (\Exception $e) {
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return array("mentorships" => $result);
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
