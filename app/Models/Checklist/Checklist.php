<?php

namespace App\Models\Checklist;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Checklist extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_checklist';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public static function editChecklistStatus() {
  $checklistId = Request::get("checklist_id");
  $status = Request::get("status");
  $checklist = Checklist::find($checklistId);
  $checklist->status = $status;

  DB::beginTransaction();
  try {
   $checklist->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $checklist;
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

}
