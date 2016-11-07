<?php

namespace App\Models\Component;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ComponentSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_component_swipe';

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

 public static function getComponentSwipe($componentId) {
  $componentSwipes = ComponentSwipe::with('creator')
          ->with('contributor')
          ->with('level')
          ->with('status')
          ->orderBy('id', 'DESC')
          ->where('component_id', $componentId)
          ->get();
  return $componentSwipes;
 }

 public static function getSwipeStats($userId) {
  $swipesCount = ComponentSwipe::where('contributor_id', $userId)
          ->count();
  return array('totalCount' => $swipesCount);
 }

}
