<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Component\Component;
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

 public static function getExplorerComponents($explorerId) {
  $explorerComponents = ExplorerComponent::with('component')
          ->with('component.creator')
          ->whereHas('component', function($q) {
           $q->whereNull('parent_component_id');
          })
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerComponents;
 }

 public static function getExplorerComponent($explorerId, $componentId) {
  $explorerComponent = ExplorerComponent::with('component')
          ->orderBy('id', 'DESC')
          ->with('component.creator')
          ->where('explorer_id', $explorerId)
          ->where('component_id', $componentId)
          ->first();
  return $explorerComponent;
 }

 public static function createExplorerComponent() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $component = new Component;
  $explorerComponent = new ExplorerComponent;
  $component->creator_id = $userId;
  $component->title = $title;
  $component->description = $description;
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
