<?php

/*
  |--------------------------------------------------------------------------
  | Skill Section Application Routes
  |--------------------------------------------------------------------------
  |
  | All of the routes for application are registered here. It is mapped to the
  | controller
  |
  |
 */

Route::get('/', function () {
 return view('index');
});

Route::group(['prefix' => 'api'], function() {
 //Auth
 Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
 Route::post('authenticate', 'AuthenticateController@authenticate');
 Route::post('register', 'AuthenticateController@register');
 Route::get('logout', 'AuthenticateController@logout');
 Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');

 //Constants
 Route::get('constants/all', 'ConstantsController@getConstants');
 Route::get('constants/level/{parent}', 'ConstantsController@getLevel');
 Route::get('constants/componenttypes', 'ConstantsController@getComponentTypes');

 //Search
 Route::post('search/simple', 'SearchController@simpleSearch');
 Route::post('search/suggestion', 'SearchController@suggestionSearch');

 //Answers
 Route::get('answers/{questionId}/explorer/{explorerId}/preview', 'Explorer\ExplorerController@getExplorerSectionAnswersPreview');
 Route::get('answers/{questionId}/explorer/{explorerId}', 'Explorer\ExplorerController@getExplorerSectionAnswers');
 Route::post('answers/create', 'Explorer\ExplorerController@createExplorerSectionAnswer');

//Community
 Route::get('community/users', 'Community\CommunityController@getUsers');
 Route::get('community/users/other', 'Community\CommunityController@getOtherUsers');

 //Profile
 Route::get('profile/{id}/connections', 'Profile\ProfileController@getUserConnections');
 Route::get('profiles/all', 'Profile\ProfileController@getProfilesAll');
 Route::get('profile/{id}/sections', 'Profile\ProfileController@getUserProfileSections');
 Route::get('profile/{id}', 'Profile\ProfileController@getProfile');
 Route::post('user/request/create', 'Community\CommunityController@createRequest');

 //Activity
 Route::get('activity/{activityId}/activities', 'Activity\ActivityController@getSubActivities');
 Route::get('activity/{activityId}/questions', 'Activity\ActivityController@getActivityQuestions');
 Route::post('activity/editstatus', 'Activity\ActivityController@editActivityStatus');
 Route::get('activity/{activityId}/checklist/data', 'Activity\ActivityController@activityChecklistStatusData');
 Route::get('activity/{activityId}/checklist', 'Explorer\ExplorerController@getExplorerActivityChecklist');
 Route::post('activity/checklist/create', 'Explorer\ExplorerController@createExplorerActivityChecklist');
 Route::post('activity/checklist/edit', 'Explorer\ExplorerController@editExplorerActivityChecklist');

 //Component
 Route::get('components/listformat/{listFormat}', 'Component\ComponentController@getAllComponents');
 Route::get('components/listformat/{listFormat}/type/{type}', 'Component\ComponentController@getComponentsByType');
 Route::get('components/user/{userId}', 'Component\ComponentController@getUserComponents');
 Route::get('components/{componentId}/listformat/{listFormat}', 'Component\ComponentController@getComponent');
 Route::get('component/{componentId}/questions', 'Component\ComponentController@getComponentQuestions');
 Route::post('components/create', 'Component\ComponentController@createComponent');
 Route::post('components/editstatus', 'Component\ComponentController@editComponentStatus');
 Route::post('components/{componentId}/edit/description', 'Component\ComponentController@editComponentDescription');
 Route::post('components/{componentId}/edit/background', 'Component\ComponentController@editComponentBackground');
 Route::get('components/{componentId}/checklist/data', 'Component\ComponentController@componentChecklistStatusData');
 Route::get('components/random', 'Component\ComponentController@getRandomComponent');
 Route::get('components/random/type/{typeId}', 'Component\ComponentController@getRandomComponentByType');
 Route::get('component/{componentId}/checklist', 'Explorer\ExplorerController@getExplorerComponentChecklist');
 Route::post('component/checklist/create', 'Explorer\ExplorerController@createExplorerComponentChecklist');
 Route::post('component/checklist/edit', 'Explorer\ExplorerController@editExplorerComponentChecklist');
 //Component Contributions
 Route::get('components/{componentId}/contribution/type/{typeId}/suggestions', 'Component\ComponentController@getContributionSuggestions');

 //Component Bookmarks
 Route::get('components/bookmarks/{creatorId}', 'Component\ComponentController@getComponentBookmarks');
 Route::post('components/bookmarks/create', 'Component\ComponentController@createComponentBookmark');

 //Guideline
 Route::get('guideline/{guidelineId}/guidelines', 'Guideline\GuidelineController@getSubGuidelines');
 Route::post('guideline/editstatus', 'Guideline\GuidelineController@editGuidelineStatus');
 Route::get('guideline/{guidelineId}/checklist/data', 'Guideline\GuidelineController@guidelineChecklistStatusData');
 Route::get('guideline/{guidelineId}/checklist', 'Explorer\ExplorerController@getExplorerGuidelineChecklist');
 Route::post('guideline/checklist/create', 'Explorer\ExplorerController@createExplorerGuidelineChecklist');
 Route::post('guideline/checklist/edit', 'Explorer\ExplorerController@editExplorerGuidelineChecklist');

 //Plan
 Route::post('plan/editstatus', 'Plan\PlanController@editPlanStatus');
 Route::get('plan/{planId}/checklist/data', 'Plan\PlanController@planChecklistStatusData');
 Route::get('plan/{planId}/checklist', 'Explorer\ExplorerController@getExplorerPlanChecklist');
 Route::post('plan/checklist/create', 'Explorer\ExplorerController@createExplorerPlanChecklist');
 Route::post('plan/checklist/edit', 'Explorer\ExplorerController@editExplorerPlanChecklist');

 //Todos
 Route::post('todo/editstatus', 'Todo\TodoController@editTodoStatus');
 Route::get('todo/{todoId}/checklist/data', 'Todo\TodoController@todoChecklistStatusData');
 Route::get('todo/{todoId}/checklist', 'Skill\SkillController@getSkillTodoChecklist');
 Route::post('todo/checklist/create', 'Skill\SkillController@createSkillTodoChecklist');
 Route::post('todo/checklist/edit', 'Skill\SkillController@editSkillTodoChecklist');
 Route::post('checklist/editstatus', 'Todo\TodoController@editChecklistStatus');
});
