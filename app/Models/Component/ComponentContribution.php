<?php

namespace App\Models\Component;

use Illuminate\Database\Eloquent\Model;
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

 public function contributor() {
  return $this->belongsTo('App\Models\User\User', 'contributor_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

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

 public static function getContributionStats($userId) {
  $contributionsCount = ComponentContribution::where('contributor_id', $userId)
          ->count();
  return array('totalCount' => $contributionsCount);
 }

}
