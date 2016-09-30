<?php

namespace App\Models\Component;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Component extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_component';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function type() {
  return $this->belongsTo('App\Models\Level\Level', 'type_id');
 }

 public function backgroundColor() {
  return $this->belongsTo('App\Models\Level\Level', 'background_color_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

 public static function getSubComponents($componentId) {
  $components = Component::orderBy('id', 'asc')
          ->where('parent_component_id', $componentId)
          ->with('creator')
          ->with('backgroundColor')
          ->take(100)
          ->get();
  return $components;
 }

}
