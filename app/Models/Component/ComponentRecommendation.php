<?php

namespace App\Models\Component;

use Illuminate\Database\Eloquent\Model;
use App\Models\Level\Level;
use Request;
use DB;
use JWTAuth;

class ComponentRecommendation extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_component_recommendation';

 public function component() {
  return $this->belongsTo('App\Models\Component\Component', 'component_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 public function status() {
  return $this->belongsTo('App\Models\Level\Level', 'status_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

 /**
  * Get Recommendations
  *
  * @return type
  */
 public static function getComponentRecommendations() {
  $componentRecommendations = array();
  $recommendationTypes = Level::getLevel(Level::$level_categories['recommendation']);
  foreach ($recommendationTypes as $recommendationType) {
   $componentRecommendations[$recommendationType->id] = $recommendationType;
   $componentRecommendations[$recommendationType->id]["recommendationComponents"] = self::getComponentRecommendationByType($recommendationType->id);
  }
  return $componentRecommendations;
 }

 /**
  * Get All Recommendation by type
  *
  * @return type
  */
 public static function getComponentRecommendationByType($typeId) {
  $componentRecommendation = ComponentRecommendation::
          where('level_id', $typeId)
          ->orderBy('importance', 'DESC')
          ->with('component')
          ->with('component.creator')
          ->get();
  return $componentRecommendation;
 }

 /**
  * Creates a recommendation for the component
  *
  */
 public static function createComponentRecommendation() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $componentId = Request::get("componentId");
  $levelId = Request::get("levelId");
  $privacyId = Level::$level_categories["privacy"]["public"];
  $componentRecommendation = new ComponentRecommendation();
  $componentRecommendation->creator_id = $userId;
  $componentRecommendation->level_id = $levelId;
  $componentRecommendation->privacy_id = $privacyId;
  $componentRecommendation->component_id = $componentId;

  DB::beginTransaction();
  try {
   $componentRecommendation->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $componentRecommendation;
 }

 public static function getRecommendationStats($userId) {
  $recommendationsCount = ComponentRecommendation::where('contributor_id', $userId)
          ->count();
  return array('totalCount' => $recommendationsCount);
 }

}
