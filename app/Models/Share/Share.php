<?php

namespace App\Models\Share;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Share extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_share';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function share_with() {
  return $this->belongsTo('App\Models\User\User', 'share_with_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 public static function createShare($userId, $levelId, $sourceId, $shareWithIds) {

  DB::beginTransaction();
  try {
   foreach ($shareWithIds as $shareWithId) {
    $share = new Share();
    $share->creator_id = $userId;
    $share->share_with_id = $shareWithId;
    $share->level_id = $levelId;
    $share->source_id = $sourceId;
    $share->save();
   }
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return true;
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

}
