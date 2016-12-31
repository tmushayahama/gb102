<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Component\Component;
use App\Models\Level\Level;
use Request;
use DB;
use JWTAuth;

class ExplorerComponent extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_component';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function component() {
  return $this->belongsTo('App\Models\Component\Component', 'component_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerComponents($explorerId, $parentComponentId, $resultFormat) {
  $explorerComponents = ExplorerComponent::with('component')
          ->with('component.creator')
          ->with('component.type')
          ->whereHas('component', function($q) use($parentComponentId) {
           if ($parentComponentId == 0) {
            $q->whereNull('parent_component_id');
           } else {
            $q->where('parent_component_id', $parentComponentId);
           }
          })
          ->orderBy('id', 'ASC')
          ->where('explorer_id', $explorerId)
          ->get();

  foreach ($explorerComponents as $explorerComponent) {
   $explorerComponent["components"] = Component::getComponents($explorerComponent->component_id, $resultFormat);
  }

  if ($parentComponentId != 0) {
   $result = self::getExplorerComponent($explorerId, $parentComponentId);
  }

  $result["explorerComponents"] = $explorerComponents;

  return $result;
 }

 public static function getExplorerComponentsByType($explorerId, $parentComponentId) {
  $result = array();
  $componentTypes = Level::getLevel(Level::$level_categories['component_types']);

  $explorerComponents = ExplorerComponent::with('component')
          ->with('component.creator')
          ->with('component.type')
          ->whereHas('component', function($q) use($parentComponentId) {
           if ($parentComponentId == 0) {
            $q->whereNull('parent_component_id');
           } else {
            $q->where('parent_component_id', $parentComponentId);
           }
          })
          ->orderBy('id', 'ASC')
          ->where('explorer_id', $explorerId)
          ->get();

  foreach ($componentTypes as $componentType) {
   $components = Component::with('creator')
           ->with('type')
           ->with('backgroundColor')
           ->where('parent_component_id', $componentId)
           ->where('type_id', $componentType->id)
           ->orderBy('id', 'DESC')
           ->get();

   $result[$componentType->id] = $components;
   foreach ($components as $component) {
    $component["components"] = Component::getComponentsByTypes($component->id);
   }
  }

  foreach ($explorerComponents as $explorerComponent) {
   $explorerComponent["components"] = Component::getComponents($explorerComponent->component_id, $resultFormat);
  }

  if ($parentComponentId != 0) {
   $result = self::getExplorerComponent($explorerId, $parentComponentId);
  }

  $result["explorerComponents"] = $explorerComponents;

  return $result;
 }

 public static function getExplorerSubComponentsByTye($componentId) {
  $result = array();
  $componentTypes = Level::getLevel(Level::$level_categories['component_types']);

  foreach ($componentTypes as $componentType) {
   $components = Component::with('creator')
           ->with('type')
           ->with('backgroundColor')
           ->where('parent_component_id', $componentId)
           ->where('type_id', $componentType->id)
           ->orderBy('id', 'DESC')
           ->get();
   $result[$componentType->id] = $components;
   foreach ($components as $component) {
    $component["components"] = Component::getSubComponents($component->id);
   }
  }
  return $result;
 }

 public static function getExplorerComponent($explorerId, $componentId) {
  $explorerComponent = ExplorerComponent::with('component')
          ->orderBy('id', 'DESC')
          ->with('component.creator')
          ->with('component.type')
          ->with('component.backgroundColor')
          ->where('explorer_id', $explorerId)
          ->where('component_id', $componentId)
          ->first();
  return $explorerComponent;
 }

 public static function createExplorerComponent() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $parentComponentId = Request::get("parentComponentId");
  $explorerId = Request::get("explorerId");
  $typeId = Request::get("typeId");
  $title = Request::get("title");
  $description = Request::get("description");

  $component = new Component;
  $explorerComponent = new ExplorerComponent;
  $component->parent_component_id = $parentComponentId;
  $component->creator_id = $userId;
  $component->type_id = $typeId;
  $component->title = $title;
  $component->description = $description;
  $component->background_color = Level::$level_categories["default_component_background_color"];
  $explorerComponent->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $component->save();
   $explorerComponent->component()->associate($component);
   $explorerComponent->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerComponent;
 }

 public static function editExplorerComponent() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerComponentId = Request::get("explorerComponentId");
  //$componentId = Request::get("componentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerComponent = ExplorerComponent::find($explorerComponentId);
  $explorerComponent->component->title = $title;
  $explorerComponent->component->description = $description;

  DB::beginTransaction();
  try {
   $explorerComponent->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerComponent;
 }

}
