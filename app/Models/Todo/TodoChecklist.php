<?php

namespace App\Models\Todo;

use Illuminate\Database\Eloquent\Model;
use App\Models\Checklist\Checklist;
use Request;
use DB;
use JWTAuth;

class TodoChecklist extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_todo_checklist';
 public $timestamps = false;

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function checklist() {
  return $this->belongsTo('App\Models\Checklist\Checklist', 'checklist_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getTodoChecklist($todoId) {
  $todoChecklist = TodoChecklist::with('checklist')
          ->orderBy('id', 'DESC')
          ->where('todo_id', $todoId)
          ->get();
  return $todoChecklist;
 }

 public static function getTodoChecklistItem($todoId, $todoId) {
  $todoChecklist = TodoChecklist::with('todo')
          ->with('checklist')
          ->orderBy('id', 'DESC')
          ->where('todo_id', $todoId)
          ->where('todo_id', $todoId)
          ->first();
  return $todoChecklist;
 }

 public static function todoChecklistStatusData($todoId) {
  $result = array(
      'done' => TodoChecklist::todoChecklistStatusCount($todoId, 1),
      'total' => TodoChecklist::todoChecklistCount($todoId),
  );
  $result['percentage'] = TodoChecklist::todoChecklistStatusPercentage($todoId, $result);
  return $result;
 }

 public static function createTodoChecklist() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $todoId = Request::get("todoId");
  $title = Request::get("title");
  $checklist = new Checklist();
  $todoChecklist = new TodoChecklist;
  $checklist->creator_id = $userId;
  $checklist->title = $title;
  $checklist->status = 0;
  $todoChecklist->todo_id = $todoId;

  DB::beginTransaction();
  try {
   $checklist->save();
   $todoChecklist->checklist()->associate($checklist);
   $todoChecklist->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $todoChecklist;
 }

 public static function editTodoChecklist() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $checklistId = Request::get("checklistId");
  $title = Request::get("title");
  $todoChecklist = TodoChecklist::find($checklistId);
  $todoChecklist->checklist->title = $title;

  DB::beginTransaction();
  try {
   $todoChecklist->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $todoChecklist;
 }

 private static function todoChecklistCount($todoId) {
  $todoChecklistCount = TodoChecklist::where('todo_id', $todoId)
          ->count();
  return $todoChecklistCount;
 }

 private static function todoChecklistStatusCount($todoId, $status) {
  $todoChecklistCount = TodoChecklist::where('todo_id', $todoId)
          ->whereHas('checklist', function($q) use ($status) {
           $q->where('status', $status);
          })
          ->count();
  return $todoChecklistCount;
 }

 private static function todoChecklistStatusPercentage($todoId, $statusData) {
  $todoChecklistData = TodoChecklist::where('todo_id', $todoId)
          ->get();

  // if($todoChecklistData->todo->status = )

  if ($statusData['total'] > 0) {
   return round(($statusData['done'] / $statusData['total']) * 100);
  }
 }

}
