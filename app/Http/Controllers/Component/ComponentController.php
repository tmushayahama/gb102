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
use App\Models\Component\ComponentContribution;
use App\Models\Level\Level;
use Request;
use DB;

class ComponentController extends Controller {
 // ******************************
 // Component Methods
 // ******************************

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
 public function getUserComponents($userId, $listFormat = 1) {
  $components = Component::getUserComponents($userId, $listFormat);
  return \Response::json($components);
 }

 /**
  * Get a specific user components by type
  *
  * @param type $userId a specific user
  * @return json response of components
  */
 public function getUserComponentsByType($userId, $typeId) {
  $components = Component::getUserComponentsByType($userId, $typeId);
  return \Response::json($components);
 }

 /**
  * Get a specific component with its subcomponents recursively.
  *
  * @param $componentId a specific component
  * @param type $listFormat column, row or linear. Default column view
  * @return json response of a components
  */
 public function getComponent($componentId, $listFormat = 1, $depth = 1) {
  $component = Component::getComponent($componentId, $listFormat, $depth);
  return \Response::json($component);
 }

 /**
  * Get the component app and its subcomponents
  *
  * @param type $type name of the component app
  *
  * @return json response of a component
  */
 public function getComponentApp($type, $page = 0) {
  $typeId = Level::$level_categories[$type];
  if ($typeId) {
   $component = Component::getComponentApp($typeId, $page);
   return \Response::json($component);
  }
  return '';
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
  * @param type $componentId
  * @param type $typeId type id of a the component
  * @return string
  */
 public function getComponentsByType($componentId = null, $typeId) {
  $component = Component::getComponentsByType($componentId, $typeId);
  return \Response::json($component);
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
  * Update the component's title and description
  *
  * @param type $componentId
  * @return type json response of a component's new title and description
  */
 public function updateComponentDescription($componentId) {
  $description = Component::updateComponentDescription($componentId);
  return \Response::json($description);
 }

 /**
  * Update a background color of a component
  *
  * @param type $componentId
  * @return type json response of a component's new background color
  */
 public function updateComponentBackground($componentId) {
  $background = Component::updateComponentBackground($componentId);
  return \Response::json($background);
 }

 /**
  * Update a status of the component
  *
  * @return type json response of a component's new status
  */
 public function updateComponentStatus() {
  $component = Component::updateComponentStatus();
  return \Response::json($component);
 }

 // ******************************
 // Component Contribution Methods
 // ******************************

 /**
  * Get Contribution Suggestions of a component
  *
  * @param type $componentId
  * @param type $typeId the contribution type id
  * @return type json of contribution suggesstions
  */
 public function getContributionSuggestions($componentId, $typeId) {
  $contributionSuggestions = Component::getContributionSuggestions($componentId, $typeId);
  return \Response::json($contributionSuggestions);
 }

 /**
  * Create a new component contribution
  *
  * @return type json response of a newly created component contribution
  */
 public function createComponentContributions() {
  $componentContributions = ComponentContribution::createComponentContributions();
  return \Response::json($componentContributions);
 }

 /**
  * Get a component contributions
  *
  * @param type $componentId a component
  *
  * @return type json response of a component Contributor
  */
 public function getComponentContributions($componentId) {
  $componentContribution = ComponentContribution::getComponentContributions($componentId);
  return \Response::json($componentContribution);
 }

 /**
  * Get a component contributor
  *
  * @param type $componentId a component
  * @param type $contributorId a contributor
  *
  * @return type json response of a component Contributor
  */
 public function getComponentContribution($componentId, $contributorId) {
  $componentContribution = ComponentContribution::getComponentContribution($componentId, $contributorId);
  return \Response::json($componentContribution);
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
