<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */

Route::get('/', function () {
 return view('index');
});

Route::group(['prefix' => 'api'], function() {
 Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
 Route::post('authenticate', 'AuthenticateController@authenticate');
 Route::post('register', 'AuthenticateController@register');
 Route::get('logout', 'AuthenticateController@logout');
 Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');

 Route::post('search/simple', 'SearchController@simpleSearch');
 Route::post('search/suggestion', 'SearchController@suggestionSearch');

 Route::post('user/request/create', 'Community\CommunityController@createRequest');

 //Answers
 Route::get('answers/{questionId}/explorer/{explorerId}/preview', 'Explorer\ExplorerController@getExplorerSectionAnswersPreview');
 Route::get('answers/{questionId}/explorer/{explorerId}', 'Explorer\ExplorerController@getExplorerSectionAnswers');
 Route::post('answers/create', 'Explorer\ExplorerController@createExplorerSectionAnswer');


//Community
 Route::get('community/users', 'Community\CommunityController@getUsers');
 Route::get('community/users/other', 'Community\CommunityController@getOtherUsers');
 Route::get('community/mine', 'Community\CommunityController@getCommunitysMine');
 Route::get('community/swipe', 'Community\CommunityController@getCommunitySwipe');
 Route::get('community/swipes', 'Community\CommunityController@getCommunitySwipes');
 Route::post('community/swipe/create', 'Community\CommunityController@createCommunitySwipe');
 Route::get('community/{communityId}/comments', 'Community\CommunityController@getCommunityComments');
 Route::get('community/{communityId}/comment/{commentId}', 'Community\CommunityController@getCommunityComment');
 Route::get('community/{communityId}/todos', 'Community\CommunityController@getCommunityTodos');
 Route::get('community/{communityId}/todo/{todoId}', 'Community\CommunityController@getCommunityTodo');
 Route::get('community/{communityId}/notes', 'Community\CommunityController@getCommunityNotes');
 Route::get('community/{communityId}/note/{noteId}', 'Community\CommunityController@getCommunityNote');
 Route::get('community/{communityId}/progress', 'Community\CommunityController@getCommunityProgress');
 Route::get('community/{communityId}/progress/{progressId}', 'Community\CommunityController@getCommunityProgress');
 Route::get('community/{communityId}/weblinks', 'Community\CommunityController@getCommunityWeblinks');
 Route::get('community/{communityId}/weblink/{weblinkId}', 'Community\CommunityController@getCommunityWeblink');
 Route::get('community/{id}', 'Community\CommunityController@getCommunity');
 Route::post('community/edit', 'Community\CommunityController@editCommunity');
 Route::post('community/create', 'Community\CommunityController@createCommunity');
 Route::post('community/comment/create', 'Community\CommunityController@createCommunityComment');
 Route::post('community/comment/edit', 'Community\CommunityController@editCommunityComment');
 Route::post('community/todo/create', 'Community\CommunityController@createCommunityTodo');
 Route::post('community/todo/edit', 'Community\CommunityController@editCommunityTodo');
 Route::post('community/note/create', 'Community\CommunityController@createCommunityNote');
 Route::post('community/note/edit', 'Community\CommunityController@editCommunityNote');
 Route::post('community/progress/create', 'Community\CommunityController@createCommunityProgress');
 Route::post('community/progress/edit', 'Community\CommunityController@editCommunityProgress');
 Route::post('community/weblink/create', 'Community\CommunityController@createCommunityWeblink');
 Route::post('community/weblink/edit', 'Community\CommunityController@editCommunityWeblink');



 //Explorer
 Route::get('explorers/all', 'Explorer\ExplorerController@getExplorersAll');
 Route::get('explorers/all/mode/{mode}', 'Explorer\ExplorerController@getExplorersByMode');
 Route::get('explorers/subexplorers/{explorerId}/type/{typeId}', 'Explorer\ExplorerController@getSubExplorers');
 Route::get('explorers/subexplorers/{explorerId}/all/stats', 'Explorer\ExplorerController@getSubExplorersStats');




 Route::get('explorers/all/{appName}', 'Explorer\ExplorerController@getExplorers');
 Route::get('explorers/featured', 'Explorer\ExplorerController@getExplorersFeatured');
 Route::get('explorers/user/{userId}/all', 'Explorer\ExplorerController@getUserExplorersAll');
 Route::get('explorers/user/{userId}/all/stats', 'Explorer\ExplorerController@getUserExplorersAllStats');
 Route::get('explorers/user/{userId}/all/{appName}', 'Explorer\ExplorerController@getUserExplorers');

 Route::post('explorer/{explorerId}/components/create', 'Explorer\ExplorerController@createExplorerComponent');
 //Route::get('explorer/{explorerId}/components', 'Explorer\ExplorerController@getExplorerComponents');
 Route::get('explorer/{explorerId}/components/{componentId}/gbformat/{resultFormat}', 'Explorer\ExplorerController@getExplorerComponents');
 Route::get('explorer/{explorerId}/component/{componentId}', 'Explorer\ExplorerController@getExplorerComponent');




 Route::get('explorers/swipe', 'Explorer\ExplorerController@getExplorerSwipe');
 Route::get('explorers/swipes', 'Explorer\ExplorerController@getExplorerSwipes');
 Route::post('explorers/swipe/create', 'Explorer\ExplorerController@createExplorerSwipe');
 Route::get('explorer/{explorerId}/comments', 'Explorer\ExplorerController@getExplorerComments');
 Route::get('explorer/{explorerId}/comment/{commentId}', 'Explorer\ExplorerController@getExplorerComment');
 Route::get('explorer/{explorerId}/contributions', 'Explorer\ExplorerController@getExplorerContributions');
 Route::get('explorer/{explorerId}/contribution/{contributionId}', 'Explorer\ExplorerController@getExplorerContribution');
 Route::get('explorer/{explorerId}/contribution/{contributionId}/level', 'Explorer\ExplorerController@getExplorerContributionLevel');
 Route::get('explorer/{explorerId}/discussions', 'Explorer\ExplorerController@getExplorerDiscussions');
 Route::get('explorer/{explorerId}/discussion/{discussionId}', 'Explorer\ExplorerController@getExplorerDiscussion');
 Route::get('explorer/{explorerId}/todos/{statusId}', 'Explorer\ExplorerController@getExplorerTodos');
 Route::get('explorer/{explorerId}/todo/{todoId}', 'Explorer\ExplorerController@getExplorerTodo');
 Route::get('explorer/{explorerId}/notes', 'Explorer\ExplorerController@getExplorerNotes');
 Route::get('explorer/{explorerId}/note/{noteId}', 'Explorer\ExplorerController@getExplorerNote');
 Route::get('explorer/{explorerId}/objectives', 'Explorer\ExplorerController@getExplorerObjectives');
 Route::get('explorer/{explorerId}/objective/{objectiveId}', 'Explorer\ExplorerController@getExplorerObjective');
 Route::get('explorer/{explorerId}/plans', 'Explorer\ExplorerController@getExplorerPlans');
 Route::get('explorer/{explorerId}/plan/{planId}', 'Explorer\ExplorerController@getExplorerPlan');
 Route::get('explorer/{explorerId}/questions/{type}', 'Explorer\ExplorerController@getExplorerQuestions');
 Route::get('explorer/{explorerId}/question/{questionId}', 'Explorer\ExplorerController@getExplorerQuestion');



 Route::get('explorer/{explorerId}/activities', 'Explorer\ExplorerController@getExplorerActivities');
 Route::get('explorer/{explorerId}/activity/{activityId}', 'Explorer\ExplorerController@getExplorerActivity');
 Route::get('explorer/{explorerId}/exercises', 'Explorer\ExplorerController@getExplorerExercises');
 Route::get('explorer/{explorerId}/exercise/{exerciseId}', 'Explorer\ExplorerController@getExplorerExercise');
 Route::get('explorer/{explorerId}/guidelines', 'Explorer\ExplorerController@getExplorerGuidelines');
 Route::get('explorer/{explorerId}/guideline/{guidelineId}', 'Explorer\ExplorerController@getExplorerGuideline');
 Route::get('explorer/{explorerId}/requestoptions', 'Explorer\ExplorerController@getExplorerRequestOptions');
 Route::get('explorer/{explorerId}/weblinks', 'Explorer\ExplorerController@getExplorerWeblinks');
 Route::get('explorer/{explorerId}/weblink/{weblinkId}', 'Explorer\ExplorerController@getExplorerWeblink');
 Route::get('explorer/{id}', 'Explorer\ExplorerController@getExplorer');
 Route::post('explorer/edit', 'Explorer\ExplorerController@editExplorer');
 Route::post('explorer/create', 'Explorer\ExplorerController@createExplorer');
 Route::post('explorer/comment/create', 'Explorer\ExplorerController@createExplorerComment');
 Route::post('explorer/comment/edit', 'Explorer\ExplorerController@editExplorerComment');
 Route::post('explorer/contribution/create', 'Explorer\ExplorerController@createExplorerContribution');
 Route::post('explorer/contribution/edit', 'Explorer\ExplorerController@editExplorerContribution');
 Route::post('explorer/discussion/create', 'Explorer\ExplorerController@createExplorerDiscussion');
 Route::post('explorer/discussion/edit', 'Explorer\ExplorerController@editExplorerDiscussion');
 Route::post('explorer/todo/create', 'Explorer\ExplorerController@createExplorerTodo');
 Route::post('explorer/todo/edit', 'Explorer\ExplorerController@editExplorerTodo');
 Route::post('explorer/note/create', 'Explorer\ExplorerController@createExplorerNote');
 Route::post('explorer/note/edit', 'Explorer\ExplorerController@editExplorerNote');
 Route::post('explorer/objective/create', 'Explorer\ExplorerController@createExplorerObjective');
 Route::post('explorer/objective/edit', 'Explorer\ExplorerController@editExplorerObjective');
 Route::post('explorer/plan/create', 'Explorer\ExplorerController@createExplorerPlan');
 Route::post('explorer/plan/edit', 'Explorer\ExplorerController@editExplorerPlan');
 Route::post('explorer/activity/create', 'Explorer\ExplorerController@createExplorerActivity');
 Route::post('explorer/activity/edit', 'Explorer\ExplorerController@editExplorerActivity');
 Route::post('explorer/exercise/create', 'Explorer\ExplorerController@createExplorerExercise');
 Route::post('explorer/exercise/edit', 'Explorer\ExplorerController@editExplorerExercise');
 Route::post('explorer/guideline/create', 'Explorer\ExplorerController@createExplorerGuideline');
 Route::post('explorer/guideline/edit', 'Explorer\ExplorerController@editExplorerGuideline');
 Route::post('explorer/weblink/create', 'Explorer\ExplorerController@createExplorerWeblink');
 Route::post('explorer/weblink/edit', 'Explorer\ExplorerController@editExplorerWeblink'); //Swipe
//Swipe

 Route::get('swipe/answers', 'Swipe\SwipeController@getAllSwipeAnswers');
 Route::get('swipe/answers/{userId}', 'Swipe\SwipeController@getSwipeAnswers');
 Route::get('swipes/swipe', 'Swipe\SwipeController@getSwipe');
 Route::post('swipes/create', 'Swipe\SwipeController@createSwipe');
 Route::get('swipe/{swipeId}/comments', 'Swipe\SwipeController@getSwipeComments');
 Route::get('swipe/{swipeId}/comment/{commentId}', 'Swipe\SwipeController@getSwipeComment');
 Route::get('swipe/{swipeId}/todos', 'Swipe\SwipeController@getSwipeTodos');
 Route::get('swipe/{swipeId}/todo/{todoId}', 'Swipe\SwipeController@getSwipeTodo');
 Route::get('swipe/{swipeId}/notes', 'Swipe\SwipeController@getSwipeNotes');
 Route::get('swipe/{swipeId}/note/{noteId}', 'Swipe\SwipeController@getSwipeNote');
 Route::get('swipe/{swipeId}/weblinks', 'Swipe\SwipeController@getSwipeWeblinks');
 Route::get('swipe/{swipeId}/weblink/{weblinkId}', 'Swipe\SwipeController@getSwipeWeblink');
 Route::get('swipe/{id}', 'Swipe\SwipeController@getSwipe');
 Route::post('swipe/edit', 'Swipe\SwipeController@editSwipe');
 Route::post('swipe/create', 'Swipe\SwipeController@createSwipe');
 Route::post('swipe/comment/create', 'Swipe\SwipeController@createSwipeComment');
 Route::post('swipe/comment/edit', 'Swipe\SwipeController@editSwipeComment');
 Route::post('swipe/todo/create', 'Swipe\SwipeController@createSwipeTodo');
 Route::post('swipe/todo/edit', 'Swipe\SwipeController@editSwipeTodo');
 Route::post('swipe/note/create', 'Swipe\SwipeController@createSwipeNote');
 Route::post('swipe/note/edit', 'Swipe\SwipeController@editSwipeNote');
 Route::post('swipe/weblink/create', 'Swipe\SwipeController@createSwipeWeblink');
 Route::post('swipe/weblink/edit', 'Swipe\SwipeController@editSwipeWeblink');

//Questionnaire
 Route::get('questionnaire/{questionnaireId}/question', 'Questionnaire\QuestionnaireController@getQuestionnaireQuestion');
 Route::get('questionnaires/questionnaire', 'Questionnaire\QuestionnaireController@getQuestionnaire');
 Route::post('questionnaires/create', 'Questionnaire\QuestionnaireController@createQuestionnaire');

 Route::get('questionnaire/answers', 'Questionnaire\QuestionnaireController@getAllQuestionAnswers');
 Route::get('questionnaire/answers/{userId}', 'Questionnaire\QuestionnaireController@getQuestionAnswers');
 Route::post('questionnaire/answer/create', 'Questionnaire\QuestionnaireController@createQuestionAnswer');

 Route::get('questionnaire/{questionnaireId}/comments', 'Questionnaire\QuestionnaireController@getQuestionnaireComments');
 Route::get('questionnaire/{questionnaireId}/comment/{commentId}', 'Questionnaire\QuestionnaireController@getQuestionnaireComment');
 Route::get('questionnaire/{questionnaireId}/todos', 'Questionnaire\QuestionnaireController@getQuestionnaireTodos');
 Route::get('questionnaire/{questionnaireId}/todo/{todoId}', 'Questionnaire\QuestionnaireController@getQuestionnaireTodo');
 Route::get('questionnaire/{questionnaireId}/notes', 'Questionnaire\QuestionnaireController@getQuestionnaireNotes');
 Route::get('questionnaire/{questionnaireId}/note/{noteId}', 'Questionnaire\QuestionnaireController@getQuestionnaireNote');
 Route::get('questionnaire/{questionnaireId}/weblinks', 'Questionnaire\QuestionnaireController@getQuestionnaireWeblinks');
 Route::get('questionnaire/{questionnaireId}/weblink/{weblinkId}', 'Questionnaire\QuestionnaireController@getQuestionnaireWeblink');
 Route::get('questionnaire/{id}', 'Questionnaire\QuestionnaireController@getQuestionnaire');
 Route::post('questionnaire/edit', 'Questionnaire\QuestionnaireController@editQuestionnaire');
 Route::post('questionnaire/create', 'Questionnaire\QuestionnaireController@createQuestionnaire');
 Route::post('questionnaire/comment/create', 'Questionnaire\QuestionnaireController@createQuestionnaireComment');
 Route::post('questionnaire/comment/edit', 'Questionnaire\QuestionnaireController@editQuestionnaireComment');
 Route::post('questionnaire/todo/create', 'Questionnaire\QuestionnaireController@createQuestionnaireTodo');
 Route::post('questionnaire/todo/edit', 'Questionnaire\QuestionnaireController@editQuestionnaireTodo');
 Route::post('questionnaire/note/create', 'Questionnaire\QuestionnaireController@createQuestionnaireNote');
 Route::post('questionnaire/note/edit', 'Questionnaire\QuestionnaireController@editQuestionnaireNote');
 Route::post('questionnaire/weblink/create', 'Questionnaire\QuestionnaireController@createQuestionnaireWeblink');
 Route::post('questionnaire/weblink/edit', 'Questionnaire\QuestionnaireController@editQuestionnaireWeblink');



//Question
 Route::get('questions/{type}', 'Question\QuestionController@getQuestions');


 Route::get('questions/swipe', 'Question\QuestionController@getQuestionSwipe');
 Route::get('questions/swipes', 'Question\QuestionController@getQuestionSwipes');
 Route::post('questions/swipe/create', 'Question\QuestionController@createQuestionSwipe');

 Route::get('question/{questionId}/comments', 'Question\QuestionController@getQuestionComments');
 Route::get('question/{questionId}/comment/{commentId}', 'Question\QuestionController@getQuestionComment');
 Route::get('question/{questionId}/todos', 'Question\QuestionController@getQuestionTodos');
 Route::get('question/{questionId}/todo/{todoId}', 'Question\QuestionController@getQuestionTodo');
 Route::get('question/{questionId}/notes', 'Question\QuestionController@getQuestionNotes');
 Route::get('question/{questionId}/note/{noteId}', 'Question\QuestionController@getQuestionNote');
 Route::get('question/{questionId}/requestoptions', 'Question\QuestionController@getQuestionRequestOptions');
 Route::get('question/{questionId}/progress', 'Question\QuestionController@getQuestionProgress');
 Route::get('question/{questionId}/progress/{progressId}', 'Question\QuestionController@getQuestionProgress');
 Route::get('question/{questionId}/weblinks', 'Question\QuestionController@getQuestionWeblinks');
 Route::get('question/{questionId}/weblink/{weblinkId}', 'Question\QuestionController@getQuestionWeblink');
 Route::get('question/{id}', 'Question\QuestionController@getQuestion');
 Route::post('question/edit', 'Question\QuestionController@editQuestion');
 Route::post('question/create', 'Question\QuestionController@createQuestion');
 Route::post('question/comment/create', 'Question\QuestionController@createQuestionComment');
 Route::post('question/comment/edit', 'Question\QuestionController@editQuestionComment');
 Route::post('question/todo/create', 'Question\QuestionController@createQuestionTodo');
 Route::post('question/todo/edit', 'Question\QuestionController@editQuestionTodo');
 Route::post('question/note/create', 'Question\QuestionController@createQuestionNote');
 Route::post('question/note/edit', 'Question\QuestionController@editQuestionNote');
 Route::post('question/progress/create', 'Question\QuestionController@createQuestionProgress');
 Route::post('question/progress/edit', 'Question\QuestionController@editQuestionProgress');
 Route::post('question/weblink/create', 'Question\QuestionController@createQuestionWeblink');
 Route::post('question/weblink/edit', 'Question\QuestionController@editQuestionWeblink');


 //Profile
 Route::get('profile/{id}/connections', 'Profile\ProfileController@getUserConnections');

 Route::get('profiles/all', 'Profile\ProfileController@getProfilesAll');
 Route::get('profiles/mine', 'Profile\ProfileController@getProfilesMine');
 Route::get('profiles/swipe', 'Profile\ProfileController@getProfileSwipe');
 Route::get('profiles/swipes', 'Profile\ProfileController@getProfileSwipes');
 Route::post('profiles/swipe/create', 'Profile\ProfileController@createProfileSwipe');
 Route::get('profile/{profileId}/comments', 'Profile\ProfileController@getProfileComments');
 Route::get('profile/{profileId}/comment/{commentId}', 'Profile\ProfileController@getProfileComment');
 Route::get('profile/{profileId}/todos', 'Profile\ProfileController@getProfileTodos');
 Route::get('profile/{profileId}/todo/{todoId}', 'Profile\ProfileController@getProfileTodo');
 Route::get('profile/{profileId}/notes', 'Profile\ProfileController@getProfileNotes');
 Route::get('profile/{profileId}/note/{noteId}', 'Profile\ProfileController@getProfileNote');
 Route::get('profile/{profileId}/progress', 'Profile\ProfileController@getProfileProgress');
 Route::get('profile/{profileId}/progress/{progressId}', 'Profile\ProfileController@getProfileProgress');
 Route::get('profile/{profileId}/weblinks', 'Profile\ProfileController@getProfileWeblinks');
 Route::get('profile/{profileId}/weblink/{weblinkId}', 'Profile\ProfileController@getProfileWeblink');

 Route::get('profile/{id}/sections', 'Profile\ProfileController@getUserProfileSections');
 Route::get('profile/{id}', 'Profile\ProfileController@getProfile');
 Route::post('profile/edit', 'Profile\ProfileController@editProfile');

 Route::post('profile/create', 'Profile\ProfileController@createProfile');
 Route::post('profile/comment/create', 'Profile\ProfileController@createProfileComment');
 Route::post('profile/comment/edit', 'Profile\ProfileController@editProfileComment');
 Route::post('profile/todo/create', 'Profile\ProfileController@createProfileTodo');
 Route::post('profile/todo/edit', 'Profile\ProfileController@editProfileTodo');
 Route::post('profile/note/create', 'Profile\ProfileController@createProfileNote');
 Route::post('profile/note/edit', 'Profile\ProfileController@editProfileNote');
 Route::post('profile/progress/create', 'Profile\ProfileController@createProfileProgress');
 Route::post('profile/progress/edit', 'Profile\ProfileController@editProfileProgress');
 Route::post('profile/weblink/create', 'Profile\ProfileController@createProfileWeblink');
 Route::post('profile/weblink/edit', 'Profile\ProfileController@editProfileWeblink');

 Route::get('constants/all', 'ConstantsController@getConstants');
 Route::get('constants/level/{parent}', 'ConstantsController@getLevel');
 Route::get('constants/componenttypes', 'ConstantsController@getComponentTypes');

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

 Route::post('component/create', 'Component\ComponentController@createComponent');
 Route::post('component/editstatus', 'Component\ComponentController@editComponentStatus');
 Route::post('component/{componentId}/edit/description', 'Component\ComponentController@editComponentDescription');
 Route::post('component/{componentId}/edit/background', 'Component\ComponentController@editComponentBackground');


 Route::get('component/{componentId}/checklist/data', 'Component\ComponentController@componentChecklistStatusData');

 Route::get('component/{componentId}/checklist', 'Explorer\ExplorerController@getExplorerComponentChecklist');
 Route::post('component/checklist/create', 'Explorer\ExplorerController@createExplorerComponentChecklist');
 Route::post('component/checklist/edit', 'Explorer\ExplorerController@editExplorerComponentChecklist');


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
