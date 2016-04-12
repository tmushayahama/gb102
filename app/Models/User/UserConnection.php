<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class UserConnection extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_user_connection';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function friend() {
  return $this->belongsTo('App\Models\User\User', 'friend_id');
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

 public static function getUserConnections($userId) {
  $userConnection = UserConnection::orderBy('id', 'DESC')
          ->where('creator_id', $userId)
          ->with('friend')
          ->with('creator')
          ->with('level')
          ->get();
  return $userConnection;
 }

}
