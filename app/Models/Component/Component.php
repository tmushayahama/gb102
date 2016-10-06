<?php

namespace App\Models\Component;

use Illuminate\Database\Eloquent\Model;
use App\Models\Level\Level;
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

 public static function getComponents($componentId, $resultFormat) {
  $components = Component::orderBy('id', 'asc')
          ->where('parent_component_id', $componentId)
          ->with('creator')
          ->with('backgroundColor')
          ->take(100)
          ->get();

  switch ($resultFormat) {
   case Level::$componentJsonFormat["types"]:
    $components = $components->groupBy('type_id');
    foreach ($components as $component) {
     for ($i = 0; $i < count($component); $i++) {
      $component[$i]["components"] = Component::getComponents($component[$i]->id, $resultFormat);
     }
    }
    break;
   default:
    foreach ($components as $component) {
     $component["components"] = Component::getComponents($component->id, $resultFormat);
    }
    break;
  }
  return $components;
 }

 public static function getComponentsByType($componentId, $typeId) {
  $result = array();
  //$componentTypes = Level::getLevel(Level::$level_categories['component_type']);

  foreach ($componentTypes as $componentType) {
   $components = Component::with('creator')
           ->with('type')
           ->with('backgroundColor')
           ->where('parent_component_id', $componentId)
           ->where('type_id', $componentType->id)
           ->orderBy('id', 'DESC')
           ->get();
   $result[$componentType->id] = $components->groupBy('yupe_id');
   foreach ($components as $component) {
    $component["components"] = Component::getSubComponents($component->id);
   }
  }
  return $result;
 }

 public static function editComponentBackground($componentId) {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $backgroundColorId = Request::get("backgroundColorId");
  $component = Component::find($componentId);
  $component->background_color_id = $backgroundColorId;

  DB::beginTransaction();
  try {
   $component->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();

  return Level::find($backgroundColorId);
 }

}
