<?php

namespace App\Models\Component;

use Illuminate\Database\Eloquent\Model;
use App\Models\Level\Level;
use Request;
use DB;
use JWTAuth;

class ComponentContribution extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_component_contribution';

 /**
  * Defines the component's many to one relationship with a contribution
  *
  * @return type component relationship
  */
 public function component() {
  return $this->belongsTo('App\Models\Component\Component', 'component_id');
 }

 /**
  * Defines the creator's many to one relationship with a contribution
  *
  * @return type creator relationship
  */
 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 /**
  * Defines the level's many to one relationship with a contribution
  *
  * @return type level relationship
  */
 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * Defines the status's many to one relationship with a contribution
  *
  * @return type status relationship
  */
 public function status() {
  return $this->belongsTo('App\Models\Level\Level', 'status_id');
 }

 /**
  * Defines the contributor user's many to one relationship with a contribution
  *
  * @return type contributor user relationship
  */
 public function contributor() {
  return $this->belongsTo('App\Models\User\User', 'contributor_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

 /**
  * Create a new component contribution
  *
  * @return type json response of a newly created component contribution
  */
 public static function createComponentContributions() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $contributorIds = Request::get("contributorIds");
  $componentId = Request::get("componentId");
  $description = Request::get("description");
  $levelId = Request::get("levelId");
  $privacyId = Request::get("privacyId");

  DB::beginTransaction();
  try {
   foreach ($contributorIds as $contributorId) {
    $componentContribution = new ComponentContribution;
    $componentContribution->contributor_id = $contributorId;
    $componentContribution->component_id = $componentId;
    $componentContribution->creator_id = $userId;
    $componentContribution->description = $description;
    $componentContribution->level_id = $levelId;
    $componentContribution->status_id = Level::$level_categories["status"]["pending"];
    $componentContribution->privacy_id = $privacyId;
    $componentContribution->save();
   }
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $componentContribution;
 }

 /**
  * Get the component contribution by component Id
  *
  * @param type $componentId
  *
  * @return type json response of all component contribution
  */
 public static function getComponentContribution($componentId) {
  $componentContributions = ComponentContribution::with('creator')
          ->with('contributor')
          ->with('level')
          ->with('status')
          ->orderBy('id', 'DESC')
          ->where('component_id', $componentId)
          ->get();
  return $componentContributions;
 }

 /**
  * Get the statistcs of a component contributor
  *
  * @param type $userId the contributor
  *
  * @return type json response of all component contribution
  */
 public static function getContributionStats($userId) {
  $contributionsCount = ComponentContribution::where('contributor_id', $userId)
          ->count();
  return array('totalCount' => $contributionsCount);
 }

 public static function createExplorerRequestOption($userId, $explorerId, $explorerRequestOptions) {

  DB::beginTransaction();
  try {
   foreach ($explorerRequestOptions as $request) {
    $explorerRequestOption = new ExplorerRequestOption;
    $explorerRequestOption->creator_id = $userId;
    $explorerRequestOption->explorer_id = $explorerId;
    $explorerRequestOption->level_id = $request["levelId"];
    $explorerRequestOption->description = $request["description"];
    $explorerRequestOption->save();
   }
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return true;
 }

}
