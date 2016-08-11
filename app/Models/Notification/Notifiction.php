<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Notification extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_notification';

 public function sender() {
  return $this->belongsTo('App\Models\User\User', 'sender_id');
 }

 public function recipient() {
  return $this->belongsTo('App\Models\User\User', 'recipient_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

}
