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

 public static function getAllComponents($listFormat) {
  $components = array();
  switch ($listFormat) {
   case Level::$componentJsonFormat["types"]:
    $componentTypes = Level::getLevel(Level::$level_categories['component_type']);
    foreach ($componentTypes as $componentType) {
     $components[$componentType->id] = $componentType;
     $components[$componentType->id]["components"] = Component::getComponentsByType($componentType->id);
    }
    break;
   default:
    foreach ($components as $component) {
     // $component["components"] = Component::getComponents($component->id, $resultFormat);
    }
    break;
  }
  return $components;
 }

 public static function getComponents1($componentId, $resultFormat) {
  $components = Component::orderBy('id', 'asc')
          //->where('parent_component_id', $componentId)
          ->with('type')
          ->with('creator')
          ->with('backgroundColor')
          ->take(100)
          ->get();

  switch ($resultFormat) {
   case Level::$componentJsonFormat["types"]:
    $components = $components->groupBy('type_id');
    foreach ($components as $component) {
     for ($i = 0; $i < count($component); $i++) {
      // $component[$i]["components"] = Component::getComponents($component[$i]->id, $resultFormat);
     }
    }
    break;
   default:
    foreach ($components as $component) {
     // $component["components"] = Component::getComponents($component->id, $resultFormat);
    }
    break;
  }
  return $components;
 }

 public static function getComponentsByType($typeId) {
  $components = Component::orderBy('id', 'asc')
          ->where('type_id', $typeId)
          ->with('creator')
          ->with('backgroundColor')
          ->take(20)
          ->get();
  return $components;
 }

 public static function getSubComponentsByType($componentId, $typeId) {
  $components = Component::orderBy('id', 'asc')
          ->where('parent_component_id', $componentId)
          ->where('type_id', $typeId)
          ->with('creator')
          ->with('backgroundColor')
          ->take(20)
          ->get();
  return $components;
 }

 public static function getSubComponents($componentId, $appType, $depth = 0) {
  $components = Component::orderBy('id', 'asc')
          ->where('parent_component_id', $componentId)
          ->whereHas('type', function($q) use($appType) {
           if ($appType == 1) {
            $q->where('parent_level_id', 1);
           } else if ($appType == 2) {
            $q->where('parent_level_id', '!=', 1);
           }
          })
          ->with('type')
          ->with('creator')
          ->with('backgroundColor')
          ->take(20)
          ->get();
  if ($depth > 0) {
   foreach ($components as $component) {
    $component["components"] = Component::getSubComponents($component->id, 0, $depth--);
   }
  }
  return $components;
 }

 public static function getComponent($componentId, $listFormat) {
  $component = Component::orderBy('id', 'asc')
          ->with('creator')
          ->with('backgroundColor')
          ->find($componentId);
  $components = array();
  switch ($listFormat) {
   case Level::$componentJsonFormat["types"]:
    $componentTypes = Level::getLevel(Level::$level_categories['component_type']);
    foreach ($componentTypes as $componentType) {
     $components[$componentType->id] = $componentType;
     $components[$componentType->id]["components"] = Component::getSubComponentsByType($componentId, $componentType->id);
    }
    $component["components"] = $components;
    break;
   case Level::$componentJsonFormat["columns"]:
    $component["apps"] = Component::getSubComponents($component->id, 1);
    $component["components"] = Component::getSubComponents($component->id, 2, 2);
    break;
   default:
    foreach ($components as $component) {
     // $component["components"] = Component::getComponents($component->id, $resultFormat);
    }
    break;
  }
  return $component;
 }

 public static function getComponentsByType2($componentId, $typeId) {
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
