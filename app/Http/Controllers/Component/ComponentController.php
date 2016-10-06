<?php

namespace App\Http\Controllers\Component;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Component\Component;
use App\Models\Checklist\Checklist;
use App\Models\Component\ComponentChecklist;
use Request;
use DB;

class ComponentController extends Controller {

 public function getComponents($componentId, $resultFormat = 1) {
  $components = Component::getComponents($componentId, $resultFormat);
  return \Response::json($components);
 }

 public function editComponentStatus() {
  $component = Component::editComponentStatus();
  return \Response::json($component);
 }

 public function editComponentBackground($componentId) {
  $backgroundColor = Component::editComponentBackground($componentId);
  return \Response::json($backgroundColor);
 }

 public function editChecklistStatus() {
  $checklist = Checklist::editChecklistStatus();
  return \Response::json($checklist);
 }

 public function getComponentChecklist($componentId) {
  $componentComponents = ComponentChecklist::getComponentChecklist($componentId);
  return \Response::json($componentComponents);
 }

 public function createComponentChecklist() {
  $componentComponents = ComponentChecklist::createComponentChecklist();
  return \Response::json($componentComponents);
 }

 public function componentChecklistStatusData($componentId) {
  $componentChecklistStatusData = ComponentChecklist::componentChecklistStatusData($componentId);
  return \Response::json($componentChecklistStatusData);
 }

}
