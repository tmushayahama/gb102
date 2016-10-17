<?php

namespace App\Http\Controllers\Component;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Component\Component;
use App\Models\Level\Level;
use Request;
use DB;

class ComponentController extends Controller {

 public function getAllComponents($listFormat = 1) {
  $components = Component::getAllComponents($listFormat);
  return \Response::json($components);
 }

 public function getComponent($componentId, $listFormat = 1) {
  $component = Component::getComponent($componentId, $listFormat);
  return \Response::json($component);
 }

 public function getComponentsByType($listFormat, $type) {
  $typeId = Level::$level_categories[$type];
  if ($typeId) {
   $components = Component::getComponentsByType($typeId, $listFormat);
   return \Response::json($components);
  }
  return '';
 }

 public function editComponentDescription($componentId) {
  $description = Component::editComponentDescription($componentId);
  return \Response::json($description);
 }

 public function editComponentStatus() {
  $component = Component::editComponentStatus();
  return \Response::json($component);
 }

 public function editComponentBackground($componentId) {
  $backgroundColor = Component::editComponentBackground($componentId);
  return \Response::json($backgroundColor);
 }

}
