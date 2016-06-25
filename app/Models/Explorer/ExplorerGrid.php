<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Grid\Grid;
use Request;
use DB;
use JWTAuth;

class ExplorerGrid extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_grid';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function grid() {
  return $this->belongsTo('App\Models\Grid\Grid', 'grid_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerGrids($explorerId, $type) {
  $explorerGrids = ExplorerGrid::with('grid')
          ->with('grid.creator')
          ->whereHas('grid', function($q) {
           //$q->whereNull('parent_grid_id');
          })
          ->orderBy('id', 'asc')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerGrids;
 }

 public static function getExplorerGrid($explorerId, $gridsId) {
  $explorerGrid = ExplorerGrid::with('grid')
          ->orderBy('id', 'asc')
          ->with('grid.creator')
          ->where('explorer_id', $explorerId)
          ->where('grid_id', $gridsId)
          ->first();
  return $explorerGrid;
 }

 public static function createExplorerGrid() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $grids = new Grid;
  $explorerGrid = new ExplorerGrid;
  $grids->creator_id = $userId;
  $grids->title = $title;
  $grids->description = $description;
  $explorerGrid->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $grids->save();
   $explorerGrid->grids()->associate($grids);
   $explorerGrid->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerGrid;
 }

 public static function editExplorerGrid() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerGridId = Request::get("explorerGridId");
  //$gridsId = Request::get("gridsId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerGrid = ExplorerGrid::find($explorerGridId);
  $explorerGrid->grids->title = $title;
  $explorerGrid->grids->description = $description;

  DB::beginTransaction();
  try {
   $explorerGrid->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerGrid;
 }

}
