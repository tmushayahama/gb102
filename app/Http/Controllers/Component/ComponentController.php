<?php

/**
 * This is a SkillSection's component controller. A component is a base of every component found in
 * SkillSection.
 *
 */

namespace App\Http\Controllers\Component;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Component\Component;
use App\Models\Component\ComponentBookmark;
use App\Models\Level\Level;
use Request;
use DB;

class ComponentController extends Controller {

 /**
  * Get All components with their subcomponents recursively.
  *
  * @param type $listFormat default column view
  * @return json response of components
  */
 public function getAllComponents($listFormat = 1) {
  $components = Component::getAllComponents($listFormat);
  return \Response::json($components);
 }

 /**
  * Get a specific user components with their subcomponents recursively.
  *
  * @param type $userId a specific user
  * @return json response of components
  */
 public function getUserComponents($userId) {
  $components = Component::getUserComponents($userId);
  return \Response::json($components);
 }

 /**
  * Get a specific component with its subcomponents recursively.
  *
  * @param $componentId a specific component
  * @param type $listFormat column, row or linear. Default column view
  * @return json response of a components
  */
 public function getComponent($componentId, $listFormat = 1) {
  $component = Component::getComponent($componentId, $listFormat);
  return \Response::json($component);
 }

 /**
  * Get a random component. Used for Swipe and Matcher
  * @return json response of a component
  */
 public function getRandomComponent() {
  $component = Component::getRandomComponent();
  return \Response::json($component);
 }

 /**
  * Get a random component by type. Used for Swipe and Matcher
  *
  * @param type $typeId a componentn type
  * @return type
  */
 public function getRandomComponentByType($typeId) {
  $component = Component::getRandomComponent($typeId);
  return \Response::json($component);
 }

 /**
  * Get components by type with their subcomponents recursively.
  *
  * @param type $listFormat column, row or linear
  * @param type $type type of a the component
  * @return string
  */
 public function getComponentsByType($listFormat, $type) {
  $typeId = Level::$level_categories[$type];
  if ($typeId) {
   $components = Component::getComponentsByType($typeId, $listFormat);
   return \Response::json($components);
  }
  return '';
 }

 /**
  * Create a new component with a minimum of the following request params
  * title
  * description
  * type
  *
  * @return type json response of a newly created component
  */
 public function createComponent() {
  $component = Component::createComponent();
  return \Response::json($component);
 }

 /**
  * Edit the component's title and description
  *
  * @param type $componentId
  * @return type json response of a component's new title and description
  */
 public function editComponentDescription($componentId) {
  $description = Component::editComponentDescription($componentId);
  return \Response::json($description);
 }

 /**
  * Edit a status of the component
  *
  * @return type json response of a component's new status
  */
 public function editComponentStatus() {
  $component = Component::editComponentStatus();
  return \Response::json($component);
 }

 /**
  * Edit a background color of a component
  *
  * @param type $componentId
  * @return type json response of a component's new background color
  */
 public function editComponentBackground($componentId) {
  $backgroundColor = Component::editComponentBackground($componentId);
  return \Response::json($backgroundColor);
 }

 /**
  * Get all bookmarks for a particular user
  *
  * @return type json response of all component bookmarks
  */
 public function getComponentBookmarks($creatorId) {
  $componentBookmarks = ComponentBookmark::getComponentBookmarks($creatorId);
  return \Response::json($componentBookmarks);
 }

 /**
  * Create a new component with a minimum of the following request params
  * title
  * description
  * type
  *
  * @return type json response of a newly created component
  */
 public function createComponentBookmark() {
  $componentBookmark = ComponentBookmark::createComponentBookmark();
  return \Response::json($componentBookmark);
 }

}
