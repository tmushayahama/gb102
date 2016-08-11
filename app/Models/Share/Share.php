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

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

}
