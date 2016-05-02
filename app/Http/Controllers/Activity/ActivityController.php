<?php

namespace App\Http\Controllers\Activity;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Activity\Activity;
use App\Models\Checklist\Checklist;
use App\Models\Activity\ActivityChecklist;
use App\Models\Activity\ActivityQuestion;
use Request;
use DB;

class ActivityController extends Controller {

 public function getSubActivities($activityId) {
  $subActivities = Activity::getSubActivities($activityId);
  return \Response::json($subActivities);
 }

 public function editActivityStatus() {
  $activity = Activity::editActivityStatus();
  return \Response::json($activity);
 }

 public function editChecklistStatus() {
  $checklist = Checklist::editChecklistStatus();
  return \Response::json($checklist);
 }

 public function getActivityQuestions($activityId) {
  $activityQuestions = ActivityQuestion::getActivityQuestions($activityId);
  return \Response::json($activityQuestions);
 }

 public function getActivityChecklist($activityId) {
  $activityActivities = ActivityChecklist::getActivityChecklist($activityId);
  return \Response::json($activityActivities);
 }

 public function createActivityChecklist() {
  $activityActivities = ActivityChecklist::createActivityChecklist();
  return \Response::json($activityActivities);
 }

 public function activityChecklistStatusData($activityId) {
  $activityChecklistStatusData = ActivityChecklist::activityChecklistStatusData($activityId);
  return \Response::json($activityChecklistStatusData);
 }

}
