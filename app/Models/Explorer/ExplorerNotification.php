<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Notification\Notification;
use Request;
use DB;
use JWTAuth;

class ExplorerNotification extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_notification';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function notification() {
  return $this->belongsTo('App\Models\Notification\Notification', 'notification_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerNotifications($explorerId) {
  $explorerNotifications = ExplorerNotification::with('notification')
          ->with('notification.creator')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerNotifications;
 }

 public static function getExplorerNotification($explorerId, $notificationId) {
  $explorerNotification = ExplorerNotification::with('notification')
          ->with('notification.creator')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->where('notification_id', $notificationId)
          ->first();
  return $explorerNotification;
 }

 public static function createExplorerNotification() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");

  $notification = new Notification();
  $explorerNotification = new ExplorerNotification();
  $notification->creator_id = $userId;
  $notification->title = $title;
  $notification->description = $description;
  $explorerNotification->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $notification->save();
   $explorerNotification->notification()->associate($notification);
   $explorerNotification->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerNotification;
 }

 public static function editExplorerNotification() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerNotificationId = Request::get("explorerNotificationId");
  //$notificationId = Request::get("notificationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerNotification = ExplorerNotification::find($explorerNotificationId);
  $explorerNotification->notification->title = $title;
  $explorerNotification->notification->description = $description;

  DB::beginTransaction();
  try {
   $explorerNotification->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerNotification;
 }

}
