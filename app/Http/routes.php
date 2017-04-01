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
 Route::post('user/invite', 'AuthenticateController@invite');
 Route::get('logout', 'AuthenticateController@logout');
 Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');

 //Constants
 Route::get('constants/all', 'ConstantsController@getConstants');
 Route::get('constants/level/{parent}', 'ConstantsController@getLevel');
 Route::get('constants/componenttypes', 'ConstantsController@getComponentTypes');

 //Search
 Route::get('search/keyword/{keyword}', 'SearchController@keywordSearch');
 Route::get('search/suggestion/keyword/{keyword}', 'SearchController@suggestionSearch');

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


 //Component
 Route::get('components/listformat/{listFormat}', 'Component\ComponentController@getAllComponents');
 Route::get('components/{componentId}/type/{type}', 'Component\ComponentController@getComponentsByType');
 Route::get('components/app/{type}/page/{page}', 'Component\ComponentController@getComponentApp');
 Route::get('components/app/{type}', 'Component\ComponentController@getComponentApp');

 Route::get('components/user/{userId}/listformat/{listFormat}', 'Component\ComponentController@getUserComponents');
 Route::get('components/user/{userId}/type/{typeId}', 'Component\ComponentController@getUserComponentsByType');
 Route::get('components/{componentId}/listformat/{listFormat}', 'Component\ComponentController@getComponent');
 Route::get('components/{componentId}/listformat/{listFormat}/depth/{depth}', 'Component\ComponentController@getComponent');

 Route::get('component/{componentId}/questions', 'Component\ComponentController@getComponentQuestions');
 Route::post('components/create', 'Component\ComponentController@createComponent');
 Route::post('components/editstatus', 'Component\ComponentController@editComponentStatus');
 Route::post('components/{componentId}/update/description', 'Component\ComponentController@updateComponentDescription');
 Route::post('components/{componentId}/update/background', 'Component\ComponentController@updateComponentBackground');
 Route::get('components/{componentId}/checklist/data', 'Component\ComponentController@componentChecklistStatusData');
 Route::get('components/random', 'Component\ComponentController@getRandomComponent');
 Route::get('components/random/typeid/{typeId}', 'Component\ComponentController@getRandomComponentByType');
 Route::get('component/{componentId}/checklist', 'Explorer\ExplorerController@getExplorerComponentChecklist');
//Component Contributions
 Route::get('components/{componentId}/contribution/type/{typeId}/suggestions', 'Component\ComponentController@getContributionSuggestions');
 Route::post('components/contributions/create', 'Component\ComponentController@createComponentContributions');
 //Mentorship
 Route::get('components/{componentId}/mentorships', 'Mentorship\MentorshipController@getMentorship');
 Route::post('mentorships/create', 'Mentorship\MentorshipController@createMentorship');
 //Mentorship Request
 Route::get('mentorships/{componentId}/request/type/{typeId}/suggestions', 'Mentorship\MentorshipController@getRequestSuggestions');
 Route::get('mentorship/{mentorshipId}/listformat/{listFormat}', 'Mentorship\MentorshipController@getMentorship');



 //Component Bookmarks
 Route::get('components/bookmarks/{creatorId}', 'Component\ComponentController@getComponentBookmarks');
 Route::post('components/bookmarks/create', 'Component\ComponentController@createComponentBookmark');
});
