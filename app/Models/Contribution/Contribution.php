<?php

namespace App\Models\Contribution;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Contribution extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_contribution';

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

 public static function getContributionStats($userId) {
  $contributionsCount = Contribution::where('contributor_id', $userId)
          ->count();
  return array('totalCount' => $contributionsCount);
 }

}
