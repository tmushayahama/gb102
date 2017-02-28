<?php

namespace App\Models\Component;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Models\Component\ComponentContribution;
use App\Models\Mentorship\Mentorship;
use App\Models\Level\Level;
use App\Models\User\User;
use Request;
use DB;
use JWTAuth;

/**
 * This is a SkillSection's component model. A component is a base of every component found in
 * SkillSection.
 * Follwing is list of components derived from Component. They have shared properties This has helped
 * to reduce the number database tables and simplified it.
 *
 * - Note
 * - Guideline
 * - Activity
 * - Step
 * - Question
 * - Checklist Item
 * - Weblink Item
 * - Todo Item
 * - Skill
 * - Goals
 * - Hobby
 * - Promise
 * - Mentorship
 * - Collaboration
 * - Teach
 * - Advice
 * - Group
 * - Journal
 * - Page
 * - Project
 *
 */
class Component extends Model {

 /**
  * The default value for a newly created component
  *
  * var string
  */
 const DEFAULT_PICTURE_URL = 'default.png';

 /**
  * The database table used by the model gb_component.
  *
  * @var string
  */
 protected $table = 'gb_component';

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description'];

 /**
  * Defines the creator's many to one relationship with a component
  *
  * @return type creator relationship
  */
 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 /**
  * Defines the creator's many to one relationship with it's parent component
  *
  * @return type creator relationship
  */
 public function parentComponent() {
  return $this->belongsTo('App\Models\Component\Component', 'parent_component_id');
 }

 /**
  * Defines the level type's many to one relationship with a component
  *
  * @return type level type relationship
  */
 public function type() {
  return $this->belongsTo('App\Models\Level\Level', 'type_id');
 }

 /**
  * Create a new component with a minimum of the following request params
  * title
  * description
  * type
  *
  * @return type a newly created component with limited data beacuse it is redirected to the new page
  */
 public static function createComponent() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $parentComponentId = Request::get("parentComponentId");
  $typeId = Request::get("typeId");
  $privacy = Request::get("privacyId");
  $title = Request::get("title");
  $description = Request::get("description");

  $component = new Component;
  $component->parent_component_id = $parentComponentId;
  $component->creator_id = $userId;
  $component->type_id = $typeId;
  $component->title = $title;
  $component->description = $description;
  $component->template_type_id = Level::$level_categories["template_types"]["basic"];
  $component->privacy_id = $privacy;
  $component->component_picture_url = Component::DEFAULT_PICTURE_URL;

  DB::beginTransaction();
  try {
   $component->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $component;
 }

 /**
  * Get All components with their subcomponents recursively.
  *
  * @param type $listFormat default column view
  * @return components colection
  */
 public static function getAllComponents($listFormat) {
  $components = array();

  switch ($listFormat) {
   case Level::$componentJsonFormat["recommendations"]:
    $components["recommendations"] = ComponentRecommendation::getComponentRecommendations();
    $components["samples"] = ComponentRecommendation::getComponentRecommendationByType(Level::$level_categories["recommendation_setup"]["samples"]);
    break;
   case Level::$componentJsonFormat["types"]:
    $componentTypes = Level::getSubLevels(Level::$level_categories['apps']);
    foreach ($componentTypes as $componentType) {
     $components["apps"][$componentType->id] = $componentType;
     $components["apps"][$componentType->id]["components"] = Component::getComponentsByType(null, $componentType->id);
    }
    $componentTypes = Level::getSubLevels(Level::$level_categories['component_types']);
    foreach ($componentTypes as $componentType) {
     $components["activities"][$componentType->id] = $componentType;
     $components["activities"][$componentType->id]["components"] = Component::getComponentsByType(null, $componentType->id);
    }
    break;
   default:
    //TODO
    break;
  }
  return $components;
 }

 /**
  * Get a specific user components with their subcomponents recursively.
  *
  * @param type $userId a specific user
  * @return components collection
  */
 public static function getUserComponents($userId, $listFormat = 0) {
  switch ($listFormat) {
   case Level::$componentJsonFormat["types"]:
    $component = self::formatUserComponentByType($userId);
    break;
   default:
    $component["apps"] = Component::getUserSubComponents($userId, 1, 2);
    $component["activities"] = Component::getUserSubComponents($userId, 2, 2);
    break;
  }
  return $component;
 }

 /**
  * Get components by type with their subcomponents recursively.
  *
  * @param type $typeId type of a the component
  * @return components collection
  */
 public static function getComponentsByType($componentId, $typeId, $page = 0) {
  $query = Component::orderBy('order', 'desc')
          ->where('type_id', $typeId)
          ->with('creator')
          ->with('type')
          ->offset($page * 20)
          ->take(20);
  if ($componentId) {
   $query->where('parent_component_id', $componentId);
  }

  $components = $query->get();

  return $components;
 }

 /**
  * Get user components by type with their subcomponents recursively.
  *
  * @param userId the creator of the component
  * @param type $typeId type of a the component
  * @return components collection
  */
 public static function getUserComponentsByType($userId, $typeId) {
  $components = Component::orderBy('order', 'desc')
          ->where('type_id', $typeId)
          ->where('creator_id', $userId)
          ->with("parentComponent")
          ->with('creator')
          ->take(20)
          ->get();
  return $components;
 }

 /**
  * A helper function for recursively getting subcomponents by type with their subbcomponents recursively....
  *
  * @param type $componentId id of the component
  * @param type $typeId type of a the component
  * @return components collection
  */
 public static function getSubComponentsByType($componentId, $typeId) {
  $components = Component::orderBy('id', 'asc')
          ->where('parent_component_id', $componentId)
          ->where('type_id', $typeId)
          ->with('creator')
          ->take(10)
          ->get();

  foreach ($components as $component) {
   $component["stats"] = self::getComponentStats($component->id);
   $component["contributions"] = ComponentContribution::getComponentContribution($component->id);
  }
  return $components;
 }

 /**
  * Get subcomponents of a component recursively
  *
  * @param type $componentId a component Id
  * @param type $appType the type of a component
  * @param type $depth how deep should the recursion go
  *
  * @return type components collection
  */
 public static function getSubComponents($componentId, $appType, $depth = 1) {
  $components = Component::orderBy('id', 'asc')
          ->where('parent_component_id', $componentId)
          ->whereHas('type', function($q) use($appType) {
           if ($appType == 1) {
            $q->where('parent_level_id', 1);
           } else if ($appType == 2) {
            $q->where('parent_level_id', Level::$level_categories['component_types']);
           } else if ($appType == 3) {
            $q->where('parent_level_id', Level::$level_categories['component_motives']);
           }
          })
          ->with('type')
          ->with('creator')
          ->take(50)
          ->get();

  if ($depth > 1) {
   foreach ($components as $component) {
    $component["contributions"] = ComponentContribution::getComponentContribution($component->id);
    $component["stats"] = self::getComponentStats($component->id);
    $component["components"] = Component::getSubComponents($component->id, 0, $depth--);
   }
  }
  return $components;
 }

 public static function getSubComponentsTree($componentId, $appType, $depth = 0) {
  $components = Component::orderBy('id', 'asc')
          ->where('parent_component_id', $componentId)
          ->whereHas('type', function($q) use($appType) {
           if ($appType == 1) {
            $q->where('parent_level_id', 1);
           } else if ($appType == 2) {
            $q->where('parent_level_id', Level::$level_categories['component_types']);
           } else if ($appType == 3) {
            $q->where('parent_level_id', Level::$level_categories['component_motives']);
           }
          })
          ->take(50)
          ->get();

  if ($depth > 0) {
   foreach ($components as $component) {
    $component["contributions"] = ComponentContribution::getComponentContribution($component->id);
    $component["components"] = Component::getSubComponents($component->id, 0, $depth--);
   }
  }
  return $components;
 }

 /**
  * A hepler function to get a specific user components with their subcomponents recursively.
  *
  * @param type $userId a specific user
  * @param type $appType
  * @param type $depth how deep the recursion should go
  * @return json response of components
  */
 public static function getUserSubComponents($userId, $appType, $depth = 0) {
  $components = Component::orderBy('id', 'asc')
          ->where('creator_id', $userId)
          ->whereHas('type', function($q) use($appType) {
           if ($appType == 1) {
            $q->where('parent_level_id', 1);
           } else if ($appType == 2) {
            $q->where('parent_level_id', Level::$level_categories['component_types']);
           } else if ($appType == 3) {
            $q->where('parent_level_id', Level::$level_categories['component_motives']);
           }
          })
          ->with('type')
          ->with('creator')
          ->take(20)
          ->get();
  if ($depth > 0) {
   foreach ($components as $component) {
    $component["components"] = Component::getSubComponents($component->id, 0, $depth--);
   }
  }
  return $components;
 }

 /**
  * Get a specific component with its subcomponents recursively.
  *
  * @param $componentId a specific component
  * @param type $listFormat column, row or linear. Default column view
  * @return component
  */
 public static function getComponent($componentId, $listFormat, $depth) {
  $component = Component::orderBy('id', 'asc')
          ->with('type')
          ->with('creator')
          ->with('parentComponent')
          ->find($componentId);
  $component["stats"] = self::getComponentStats($componentId);
  $component["contributions"] = ComponentContribution::getComponentContribution($componentId);
  $component["mentorships"] = Mentorship::getMentorships($componentId);

  switch ($listFormat) {
   case Level::$componentJsonFormat["types"]:
    self::formatComponentByType($component);
    break;
   case Level::$componentJsonFormat["columns"]:
    self::formatComponentByColumn($component);
    break;
   case Level::$componentJsonFormat["linear"]:
    self::formatComponentByLinear($component);
    break;
   case Level::$componentJsonFormat["tree"]:
    self::formatComponentByTree($component, $depth);
    break;
   default:
    $component["components"] = self::getSubComponents($componentId, null, 1);
    break;
  }
  return $component;
 }

 /**
  * Get the component app and its subcomponents
  *
  * @param type $typeId id of the component app
  *
  * @return json response of a component
  */
 public static function getComponentApp($typeId, $page) {
  $component = array();
  $component["appType"] = Level::getLevel($typeId);
  $component["components"] = Component::getComponentsByType(null, $typeId, $page);
  return $component;
 }

 /**
  * Get a random component by type. Used for Swipe and Matcher
  *
  * @param type $typeId a component type
  * @return type random component
  */
 public static function getRandomComponent($typeId = null) {
  $howMany = 1;
  $query = Component::with('creator')
          ->with('type')
          ->take(500);

  if ($typeId) {
   $query = $query->where('type_id', $typeId);
  }

  $query = $query->get();

  $component = (new Collection($query))
          ->random($howMany);

  return $component;
 }

 /**
  * Edit the component's title and description
  *
  * @param type $componentId
  * @return type json response of a component's new title and description
  */
 public static function updateComponentDescription($componentId) {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $component = Component::find($componentId);
  $component->title = $title;
  $component->description = $description;

  DB::beginTransaction();
  try {
   $component->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();

  $result = array();
  $result["id"] = $component->id;
  $result["title"] = $component->title;
  $result["description"] = $component->description;
  return $result;
 }

 /**
  * Edit the component's title and background
  *
  * @param type $componentId
  * @return type json response of a component's new title and background
  */
 public static function updateComponentBackground($componentId) {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $backgroundColor = Request::get("backgroundColor");
  $component = Component::find($componentId);
  $component->title = $title;
  $component->background_color = $backgroundColor;

  DB::beginTransaction();
  try {
   $component->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();

  $result = array();
  $result["id"] = $component->id;
  $result["title"] = $component->title;
  $result["background"] = $component->background;
  return $result;
 }

 /**
  * Get Contribution Suggestions of a component
  *
  * @param type $componentId
  * @param type $typeId the contribution type id
  * @return type json of contribution suggesstions
  */
 public static function getContributionSuggestions($componentId, $typeId) {
  //placeholder functions
  $users = User::get();
  return $users;
 }

 /**
  * Helper function to get a component statistics
  *
  * @param type $componentId an id of the component
  * @return type
  */
 private static function getComponentStats($componentId) {
  return array(
      "activities_count" => Component::
              where('parent_component_id', $componentId)
              ->count(),
      "contributors_count" => ComponentContribution::
              where('component_id', $componentId)
              ->count(),
      "discussions_count" => 0,
  );
 }

 /**
  * Format the results of the componet by Type
  *
  * @param array $component the parent component to be formatted
  */
 private static function formatComponentByType($component) {
  $componentMotiveTypes = Level::getSubLevels(Level::$level_categories['component_motives']);
  $componentRoomTypes = Level::getSubLevels(Level::$level_categories['room']);
  $componentServiceTypes = Level::getSubLevels(Level::$level_categories['service']);
  $componentSectionTypes = Level::getSubLevels(Level::$level_categories['section']);
  $componentActivityTypes = Level::getSubLevels(Level::$level_categories['component_types']);

  $component["apps"] = Component::getSubComponents($component->id, 1);
  $component["motives"] = self::formatSubComponentByType($component->id, $componentMotiveTypes);
  $component["rooms"] = self::formatSubComponentByType($component->id, $componentRoomTypes);
  $component["services"] = self::formatSubComponentByType($component->id, $componentServiceTypes);
  $component["sections"] = self::formatSubComponentByType($component->id, $componentSectionTypes);
  $component["activities"] = self::formatSubComponentByType($component->id, $componentActivityTypes);
 }

 /**
  * Format the results of the componet for linear view
  *
  * @param array $component the parent component to be formatted
  */
 private static function formatComponentByLinear($component) {
  $componentMotiveTypes = Level::getSubLevels(Level::$level_categories['component_motives']);
  $componentAppTypes = Level::getSubLevels(Level::$level_categories['apps']);
  $componentActivityTypes = Level::getSubLevels(Level::$level_categories['component_types']);

  $motives = collect(self::formatSubComponentByType($component->id, $componentMotiveTypes));
  $apps = collect(self::formatSubComponentByType($component->id, $componentAppTypes));
  $activities = collect(self::formatSubComponentByType($component->id, $componentActivityTypes));

  $components = $motives->merge($apps)->merge($activities);

  $component["components"] = $components->all();
 }

 /**
  * Format the results of the componet by column for column view
  *
  * @param array $component the parent component to be formatted
  */
 private static function formatComponentByColumn($component) {
  $components = array();
  $component["apps"] = Component::getSubComponents($component->id, 1);
  $component["components"] = Component::getSubComponents($component->id, 2, 3);

  $componentTypes = Level::getSubLevels(Level::$level_categories['component_motives']);
  foreach ($componentTypes as $componentType) {
   $components[$componentType->id] = $componentType;
   $components[$componentType->id]["components"] = Component::getSubComponentsByType($component->id, $componentType->id);
  }
  $component["motives"] = $components;
 }

 private static function formatComponentByTree($component, $depth) {
  $component["components"] = Component::getSubComponents($component->id, null, $depth);
  return $component;
 }

 /**
  * A helper function of format by type. It formats the results of the componet by Sub Type
  *
  * @param int $componentId the parent componentId to be formatted
  * @param array $componentTypes the types of component
  */
 public static function formatSubComponentByType($componentId, $componentTypes) {
  $components = array();
  foreach ($componentTypes as $componentType) {
   $components[$componentType->id] = $componentType;
   $components[$componentType->id]["components"] = Component::getSubComponentsByType($componentId, $componentType->id);
  }
  return $components;
 }

 //User
 /**
  * Format the results of the  user componet by Type
  *
  * @param $userId the parent component to be formatted
  */
 private static function formatUserComponentByType($userId) {
  $componentAppTypes = Level::getSubLevels(Level::$level_categories['apps']);
  $componentActivityTypes = Level::getSubLevels(Level::$level_categories['component_types']);

  $component["apps"] = self::formatUserSubComponentByType($userId, $componentAppTypes);
  $component["activities"] = self::formatUserSubComponentByType($userId, $componentActivityTypes);

  return $component;
 }

 /**
  * A helper function of format by type. It formats the results of the componet by Sub Type
  *
  * @param int $userId the parent userId
  * @param array $componentTypes the types of component
  */
 private static function formatUserSubComponentByType($userId, $componentTypes) {
  $components = array();
  foreach ($componentTypes as $componentType) {
   $components[$componentType->id] = $componentType;
   $components[$componentType->id]["components"] = Component::getUserComponentsByType($userId, $componentType->id);
  }
  return $components;
 }

 /**
  * Keyword search querybuilder
  *
  * @param type $query
  * @param type $keyword
  * @return type
  */
 public function scopeSearchByKeyword($query, $keyword) {
  if ($keyword != '') {
   $query->where(function ($query) use ($keyword) {
    $query->where("title", "LIKE", "%$keyword%")
            ->orWhere("description", "LIKE", "%$keyword%");
   });
  }
  return $query;
 }

}
