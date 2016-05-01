<?php

namespace App\Http\Controllers\Guideline;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Guideline\Guideline;
use App\Models\Checklist\Checklist;
use App\Models\Guideline\GuidelineChecklist;
use Request;
use DB;

class GuidelineController extends Controller {

 public function getSubGuidelines($guidelineId) {
  $subGuidelines = Guideline::getSubGuidelines($guidelineId);
  return \Response::json($subGuidelines);
 }

 public function editGuidelineStatus() {
  $guideline = Guideline::editGuidelineStatus();
  return \Response::json($guideline);
 }

 public function editChecklistStatus() {
  $checklist = Checklist::editChecklistStatus();
  return \Response::json($checklist);
 }

 public function getGuidelineChecklist($guidelineId) {
  $guidelineGuidelines = GuidelineChecklist::getGuidelineChecklist($guidelineId);
  return \Response::json($guidelineGuidelines);
 }

 public function createGuidelineChecklist() {
  $guidelineGuidelines = GuidelineChecklist::createGuidelineChecklist();
  return \Response::json($guidelineGuidelines);
 }

 public function guidelineChecklistStatusData($guidelineId) {
  $guidelineChecklistStatusData = GuidelineChecklist::guidelineChecklistStatusData($guidelineId);
  return \Response::json($guidelineChecklistStatusData);
 }

}
