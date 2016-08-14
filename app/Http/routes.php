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
 Route::get('explorers/all/{appName}/featured', 'Explorer\ExplorerController@getExplorersFeatured');
 Route::get('explorers/user/{userId}/all', 'Explorer\ExplorerController@getUserExplorersAll');
 Route::get('explorers/user/{userId}/all/stats', 'Explorer\ExplorerController@getUserExplorersAllStats');
 Route::get('explorers/user/{userId}/all/{appName}', 'Explorer\ExplorerController@getUserExplorers');


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


 //Goal
 Route::get('goals/all', 'Goal\GoalController@getGoalsAll');
 Route::get('goals/mine', 'Goal\GoalController@getGoalsMine');
 Route::get('goals/swipe', 'Goal\GoalController@getGoalSwipe');
 Route::get('goals/swipes', 'Goal\GoalController@getGoalSwipes');
 Route::post('goals/swipe/create', 'Goal\GoalController@createGoalSwipe');
 Route::get('goal/{goalId}/comments', 'Goal\GoalController@getGoalComments');
 Route::get('goal/{goalId}/comment/{commentId}', 'Goal\GoalController@getGoalComment');
 Route::get('goal/{goalId}/todos', 'Goal\GoalController@getGoalTodos');
 Route::get('goal/{goalId}/todo/{todoId}', 'Goal\GoalController@getGoalTodo');
 Route::get('goal/{goalId}/notes', 'Goal\GoalController@getGoalNotes');
 Route::get('goal/{goalId}/note/{noteId}', 'Goal\GoalController@getGoalNote');
 Route::get('goal/{goalId}/progress', 'Goal\GoalController@getGoalProgress');
 Route::get('goal/{goalId}/progress/{progressId}', 'Goal\GoalController@getGoalProgress');
 Route::get('goal/{goalId}/weblinks', 'Goal\GoalController@getGoalWeblinks');
 Route::get('goal/{goalId}/weblink/{weblinkId}', 'Goal\GoalController@getGoalWeblink');
 Route::get('goal/{id}', 'Goal\GoalController@getGoal');
 Route::post('goal/edit', 'Goal\GoalController@editGoal');
 Route::post('goal/create', 'Goal\GoalController@createGoal');
 Route::post('goal/comment/create', 'Goal\GoalController@createGoalComment');
 Route::post('goal/comment/edit', 'Goal\GoalController@editGoalComment');
 Route::post('goal/todo/create', 'Goal\GoalController@createGoalTodo');
 Route::post('goal/todo/edit', 'Goal\GoalController@editGoalTodo');
 Route::post('goal/note/create', 'Goal\GoalController@createGoalNote');
 Route::post('goal/note/edit', 'Goal\GoalController@editGoalNote');
 Route::post('goal/progress/create', 'Goal\GoalController@createGoalProgress');
 Route::post('goal/progress/edit', 'Goal\GoalController@editGoalProgress');
 Route::post('goal/weblink/create', 'Goal\GoalController@createGoalWeblink');
 Route::post('goal/weblink/edit', 'Goal\GoalController@editGoalWeblink');

//promise
 Route::get('promises/all', 'Promise\PromiseController@getPromisesAll');
 Route::get('promises/mine', 'Promise\PromiseController@getPromisesMine');
 Route::get('promises/swipe', 'Promise\PromiseController@getPromiseSwipe');
 Route::get('promises/swipes', 'Promise\PromiseController@getPromiseSwipes');
 Route::post('promises/swipe/create', 'Promise\PromiseController@createPromiseSwipe');
 Route::get('promise/{promiseId}/comments', 'Promise\PromiseController@getPromiseComments');
 Route::get('promise/{promiseId}/comment/{commentId}', 'Promise\PromiseController@getPromiseComment');
 Route::get('promise/{promiseId}/todos', 'Promise\PromiseController@getPromiseTodos');
 Route::get('promise/{promiseId}/todo/{todoId}', 'Promise\PromiseController@getPromiseTodo');
 Route::get('promise/{promiseId}/notes', 'Promise\PromiseController@getPromiseNotes');
 Route::get('promise/{promiseId}/note/{noteId}', 'Promise\PromiseController@getPromiseNote');
 Route::get('promise/{promiseId}/progress', 'Promise\PromiseController@getPromiseProgress');
 Route::get('promise/{promiseId}/progress/{progressId}', 'Promise\PromiseController@getPromiseProgress');
 Route::get('promise/{promiseId}/weblinks', 'Promise\PromiseController@getPromiseWeblinks');
 Route::get('promise/{promiseId}/weblink/{weblinkId}', 'Promise\PromiseController@getPromiseWeblink');
 Route::get('promise/{id}', 'Promise\PromiseController@getPromise');
 Route::post('promise/edit', 'Promise\PromiseController@editPromise');
 Route::post('promise/create', 'Promise\PromiseController@createPromise');
 Route::post('promise/comment/create', 'Promise\PromiseController@createPromiseComment');
 Route::post('promise/comment/edit', 'Promise\PromiseController@editPromiseComment');
 Route::post('promise/todo/create', 'Promise\PromiseController@createPromiseTodo');
 Route::post('promise/todo/edit', 'Promise\PromiseController@editPromiseTodo');
 Route::post('promise/note/create', 'Promise\PromiseController@createPromiseNote');
 Route::post('promise/note/edit', 'Promise\PromiseController@editPromiseNote');
 Route::post('promise/progress/create', 'Promise\PromiseController@createPromiseProgress');
 Route::post('promise/progress/edit', 'Promise\PromiseController@editPromiseProgress');
 Route::post('promise/weblink/create', 'Promise\PromiseController@createPromiseWeblink');
 Route::post('promise/weblink/edit', 'Promise\PromiseController@editPromiseWeblink');

 //Hobbys
 Route::get('hobbys/all', 'Hobby\HobbyController@getHobbysAll');
 Route::get('hobbys/mine', 'Hobby\HobbyController@getHobbysMine');
 Route::get('hobbys/swipe', 'Hobby\HobbyController@getHobbySwipe');
 Route::get('hobbys/swipes', 'Hobby\HobbyController@getHobbySwipes');
 Route::post('hobbys/swipe/create', 'Hobby\HobbyController@createHobbySwipe');
 Route::get('hobby/{hobbyId}/comments', 'Hobby\HobbyController@getHobbyComments');
 Route::get('hobby/{hobbyId}/comment/{commentId}', 'Hobby\HobbyController@getHobbyComment');
 Route::get('hobby/{hobbyId}/todos', 'Hobby\HobbyController@getHobbyTodos');
 Route::get('hobby/{hobbyId}/todo/{todoId}', 'Hobby\HobbyController@getHobbyTodo');
 Route::get('hobby/{hobbyId}/notes', 'Hobby\HobbyController@getHobbyNotes');
 Route::get('hobby/{hobbyId}/note/{noteId}', 'Hobby\HobbyController@getHobbyNote');
 Route::get('hobby/{hobbyId}/progress', 'Hobby\HobbyController@getHobbyProgress');
 Route::get('hobby/{hobbyId}/progress/{progressId}', 'Hobby\HobbyController@getHobbyProgress');
 Route::get('hobby/{hobbyId}/weblinks', 'Hobby\HobbyController@getHobbyWeblinks');
 Route::get('hobby/{hobbyId}/weblink/{weblinkId}', 'Hobby\HobbyController@getHobbyWeblink');
 Route::get('hobby/{id}', 'Hobby\HobbyController@getHobby');
 Route::post('hobby/edit', 'Hobby\HobbyController@editHobby');
 Route::post('hobby/create', 'Hobby\HobbyController@createHobby');
 Route::post('hobby/comment/create', 'Hobby\HobbyController@createHobbyComment');
 Route::post('hobby/comment/edit', 'Hobby\HobbyController@editHobbyComment');
 Route::post('hobby/todo/create', 'Hobby\HobbyController@createHobbyTodo');
 Route::post('hobby/todo/edit', 'Hobby\HobbyController@editHobbyTodo');
 Route::post('hobby/note/create', 'Hobby\HobbyController@createHobbyNote');
 Route::post('hobby/note/edit', 'Hobby\HobbyController@editHobbyNote');
 Route::post('hobby/progress/create', 'Hobby\HobbyController@createHobbyProgress');
 Route::post('hobby/progress/edit', 'Hobby\HobbyController@editHobbyProgress');
 Route::post('hobby/weblink/create', 'Hobby\HobbyController@createHobbyWeblink');
 Route::post('hobby/weblink/edit', 'Hobby\HobbyController@editHobbyWeblink');

 //Mentorship
 Route::get('mentorships/all', 'Mentorship\MentorshipController@getMentorshipsAll');
 Route::get('mentorships/submentorships/{mentorshipId}', 'Mentorship\MentorshipController@getSubMentorships');
 Route::get('mentorships/all/{mentorshipType}', 'Mentorship\MentorshipController@getMentorships');

 Route::get('mentorships/mine', 'Mentorship\MentorshipController@getMentorshipsMine');

 Route::get('mentorships/swipe', 'Mentorship\MentorshipController@getMentorshipSwipe');
 Route::get('mentorships/swipes', 'Mentorship\MentorshipController@getMentorshipSwipes');
 Route::post('mentorships/swipe/create', 'Mentorship\MentorshipController@createMentorshipSwipe');
 Route::get('mentorship/{mentorshipId}/comments', 'Mentorship\MentorshipController@getMentorshipComments');
 Route::get('mentorship/{mentorshipId}/comment/{commentId}', 'Mentorship\MentorshipController@getMentorshipComment');
 Route::get('mentorship/{mentorshipId}/todos', 'Mentorship\MentorshipController@getMentorshipTodos');
 Route::get('mentorship/{mentorshipId}/todo/{todoId}', 'Mentorship\MentorshipController@getMentorshipTodo');
 Route::get('mentorship/{mentorshipId}/notes', 'Mentorship\MentorshipController@getMentorshipNotes');
 Route::get('mentorship/{mentorshipId}/note/{noteId}', 'Mentorship\MentorshipController@getMentorshipNote');
 Route::get('mentorship/{mentorshipId}/progress', 'Mentorship\MentorshipController@getMentorshipProgress');
 Route::get('mentorship/{mentorshipId}/progress/{progressId}', 'Mentorship\MentorshipController@getMentorshipProgress');
 Route::get('mentorship/{mentorshipId}/weblinks', 'Mentorship\MentorshipController@getMentorshipWeblinks');
 Route::get('mentorship/{mentorshipId}/weblink/{weblinkId}', 'Mentorship\MentorshipController@getMentorshipWeblink');
 Route::get('mentorship/{id}', 'Mentorship\MentorshipController@getMentorship');
 Route::post('mentorship/edit', 'Mentorship\MentorshipController@editMentorship');
 Route::post('mentorship/create', 'Mentorship\MentorshipController@createMentorship');
 Route::post('mentorship/comment/create', 'Mentorship\MentorshipController@createMentorshipComment');
 Route::post('mentorship/comment/edit', 'Mentorship\MentorshipController@editMentorshipComment');
 Route::post('mentorship/todo/create', 'Mentorship\MentorshipController@createMentorshipTodo');
 Route::post('mentorship/todo/edit', 'Mentorship\MentorshipController@editMentorshipTodo');
 Route::post('mentorship/note/create', 'Mentorship\MentorshipController@createMentorshipNote');
 Route::post('mentorship/note/edit', 'Mentorship\MentorshipController@editMentorshipNote');
 Route::post('mentorship/progress/create', 'Mentorship\MentorshipController@createMentorshipProgress');
 Route::post('mentorship/progress/edit', 'Mentorship\MentorshipController@editMentorshipProgress');
 Route::post('mentorship/weblink/create', 'Mentorship\MentorshipController@createMentorshipWeblink');
 Route::post('mentorship/weblink/edit', 'Mentorship\MentorshipController@editMentorshipWeblink');

 //Collaboration
 Route::get('collaborations/all', 'Collaboration\CollaborationController@getCollaborationsAll');
 Route::get('collaborations/mine', 'Collaboration\CollaborationController@getCollaborationsMine');
 Route::get('collaborations/swipe', 'Collaboration\CollaborationController@getCollaborationSwipe');
 Route::get('collaborations/swipes', 'Collaboration\CollaborationController@getCollaborationSwipes');
 Route::post('collaborations/swipe/create', 'Collaboration\CollaborationController@createCollaborationSwipe');
 Route::get('collaboration/{collaborationId}/comments', 'Collaboration\CollaborationController@getCollaborationComments');
 Route::get('collaboration/{collaborationId}/comment/{commentId}', 'Collaboration\CollaborationController@getCollaborationComment');
 Route::get('collaboration/{collaborationId}/todos', 'Collaboration\CollaborationController@getCollaborationTodos');
 Route::get('collaboration/{collaborationId}/todo/{todoId}', 'Collaboration\CollaborationController@getCollaborationTodo');
 Route::get('collaboration/{collaborationId}/notes', 'Collaboration\CollaborationController@getCollaborationNotes');
 Route::get('collaboration/{collaborationId}/note/{noteId}', 'Collaboration\CollaborationController@getCollaborationNote');
 Route::get('collaboration/{collaborationId}/progress', 'Collaboration\CollaborationController@getCollaborationProgress');
 Route::get('collaboration/{collaborationId}/progress/{progressId}', 'Collaboration\CollaborationController@getCollaborationProgress');
 Route::get('collaboration/{collaborationId}/weblinks', 'Collaboration\CollaborationController@getCollaborationWeblinks');
 Route::get('collaboration/{collaborationId}/weblink/{weblinkId}', 'Collaboration\CollaborationController@getCollaborationWeblink');
 Route::get('collaboration/{id}', 'Collaboration\CollaborationController@getCollaboration');
 Route::post('collaboration/edit', 'Collaboration\CollaborationController@editCollaboration');
 Route::post('collaboration/create', 'Collaboration\CollaborationController@createCollaboration');
 Route::post('collaboration/comment/create', 'Collaboration\CollaborationController@createCollaborationComment');
 Route::post('collaboration/comment/edit', 'Collaboration\CollaborationController@editCollaborationComment');
 Route::post('collaboration/todo/create', 'Collaboration\CollaborationController@createCollaborationTodo');
 Route::post('collaboration/todo/edit', 'Collaboration\CollaborationController@editCollaborationTodo');
 Route::post('collaboration/note/create', 'Collaboration\CollaborationController@createCollaborationNote');
 Route::post('collaboration/note/edit', 'Collaboration\CollaborationController@editCollaborationNote');
 Route::post('collaboration/progress/create', 'Collaboration\CollaborationController@createCollaborationProgress');
 Route::post('collaboration/progress/edit', 'Collaboration\CollaborationController@editCollaborationProgress');
 Route::post('collaboration/weblink/create', 'Collaboration\CollaborationController@createCollaborationWeblink');
 Route::post('collaboration/weblink/edit', 'Collaboration\CollaborationController@editCollaborationWeblink');

 //Teach
 // Route::get('teachs/all', 'Teach\TeachController@getTeachsAll');
 Route::get('teachs/all', 'Teach\TeachController@getTeachsAll');
 Route::get('teachs/mine', 'Teach\TeachController@getTeachsMine');
 Route::get('teachs/swipe', 'Teach\TeachController@getTeachSwipe');
 Route::get('teachs/swipes', 'Teach\TeachController@getTeachSwipes');
 Route::post('teachs/swipe/create', 'Teach\TeachController@createTeachSwipe');
 Route::get('teach/{teachId}/comments', 'Teach\TeachController@getTeachComments');
 Route::get('teach/{teachId}/comment/{commentId}', 'Teach\TeachController@getTeachComment');
 Route::get('teach/{teachId}/todos', 'Teach\TeachController@getTeachTodos');
 Route::get('teach/{teachId}/todo/{todoId}', 'Teach\TeachController@getTeachTodo');
 Route::get('teach/{teachId}/notes', 'Teach\TeachController@getTeachNotes');
 Route::get('teach/{teachId}/note/{noteId}', 'Teach\TeachController@getTeachNote');
 Route::get('teach/{teachId}/progress', 'Teach\TeachController@getTeachProgress');
 Route::get('teach/{teachId}/progress/{progressId}', 'Teach\TeachController@getTeachProgress');
 Route::get('teach/{teachId}/weblinks', 'Teach\TeachController@getTeachWeblinks');
 Route::get('teach/{teachId}/weblink/{weblinkId}', 'Teach\TeachController@getTeachWeblink');
 Route::get('teach/{id}', 'Teach\TeachController@getTeach');
 Route::post('teach/edit', 'Teach\TeachController@editTeach');
 Route::post('teach/create', 'Teach\TeachController@createTeach');
 Route::post('teach/comment/create', 'Teach\TeachController@createTeachComment');
 Route::post('teach/comment/edit', 'Teach\TeachController@editTeachComment');
 Route::post('teach/todo/create', 'Teach\TeachController@createTeachTodo');
 Route::post('teach/todo/edit', 'Teach\TeachController@editTeachTodo');
 Route::post('teach/note/create', 'Teach\TeachController@createTeachNote');
 Route::post('teach/note/edit', 'Teach\TeachController@editTeachNote');
 Route::post('teach/progress/create', 'Teach\TeachController@createTeachProgress');
 Route::post('teach/progress/edit', 'Teach\TeachController@editTeachProgress');
 Route::post('teach/weblink/create', 'Teach\TeachController@createTeachWeblink');
 Route::post('teach/weblink/edit', 'Teach\TeachController@editTeachWeblink');

//Advice
 Route::get('advices/all', 'Advice\AdviceController@getAdvicesAll');
 Route::get('advices/mine', 'Advice\AdviceController@getAdvicesMine');
 Route::get('advices/swipe', 'Advice\AdviceController@getAdviceSwipe');
 Route::get('advices/swipes', 'Advice\AdviceController@getAdviceSwipes');
 Route::post('advices/swipe/create', 'Advice\AdviceController@createAdviceSwipe');
 Route::get('advice/{adviceId}/comments', 'Advice\AdviceController@getAdviceComments');
 Route::get('advice/{adviceId}/comment/{commentId}', 'Advice\AdviceController@getAdviceComment');
 Route::get('advice/{adviceId}/todos', 'Advice\AdviceController@getAdviceTodos');
 Route::get('advice/{adviceId}/todo/{todoId}', 'Advice\AdviceController@getAdviceTodo');
 Route::get('advice/{adviceId}/notes', 'Advice\AdviceController@getAdviceNotes');
 Route::get('advice/{adviceId}/note/{noteId}', 'Advice\AdviceController@getAdviceNote');
 Route::get('advice/{adviceId}/progress', 'Advice\AdviceController@getAdviceProgress');
 Route::get('advice/{adviceId}/progress/{progressId}', 'Advice\AdviceController@getAdviceProgress');
 Route::get('advice/{adviceId}/weblinks', 'Advice\AdviceController@getAdviceWeblinks');
 Route::get('advice/{adviceId}/weblink/{weblinkId}', 'Advice\AdviceController@getAdviceWeblink');
 Route::get('advice/{id}', 'Advice\AdviceController@getAdvice');
 Route::post('advice/edit', 'Advice\AdviceController@editAdvice');
 Route::post('advice/create', 'Advice\AdviceController@createAdvice');
 Route::post('advice/comment/create', 'Advice\AdviceController@createAdviceComment');
 Route::post('advice/comment/edit', 'Advice\AdviceController@editAdviceComment');
 Route::post('advice/todo/create', 'Advice\AdviceController@createAdviceTodo');
 Route::post('advice/todo/edit', 'Advice\AdviceController@editAdviceTodo');
 Route::post('advice/note/create', 'Advice\AdviceController@createAdviceNote');
 Route::post('advice/note/edit', 'Advice\AdviceController@editAdviceNote');
 Route::post('advice/progress/create', 'Advice\AdviceController@createAdviceProgress');
 Route::post('advice/progress/edit', 'Advice\AdviceController@editAdviceProgress');
 Route::post('advice/weblink/create', 'Advice\AdviceController@createAdviceWeblink');
 Route::post('advice/weblink/edit', 'Advice\AdviceController@editAdviceWeblink');

 //Journal
 Route::get('journals/all', 'Journal\JournalController@getJournalsAll');
 Route::get('journals/mine', 'Journal\JournalController@getJournalsMine');
 Route::get('journals/swipe', 'Journal\JournalController@getJournalSwipe');
 Route::get('journals/swipes', 'Journal\JournalController@getJournalSwipes');
 Route::post('journals/swipe/create', 'Journal\JournalController@createJournalSwipe');
 Route::get('journal/{journalId}/comments', 'Journal\JournalController@getJournalComments');
 Route::get('journal/{journalId}/comment/{commentId}', 'Journal\JournalController@getJournalComment');
 Route::get('journal/{journalId}/todos', 'Journal\JournalController@getJournalTodos');
 Route::get('journal/{journalId}/todo/{todoId}', 'Journal\JournalController@getJournalTodo');
 Route::get('journal/{journalId}/notes', 'Journal\JournalController@getJournalNotes');
 Route::get('journal/{journalId}/note/{noteId}', 'Journal\JournalController@getJournalNote');
 Route::get('journal/{journalId}/progress', 'Journal\JournalController@getJournalProgress');
 Route::get('journal/{journalId}/progress/{progressId}', 'Journal\JournalController@getJournalProgress');
 Route::get('journal/{journalId}/weblinks', 'Journal\JournalController@getJournalWeblinks');
 Route::get('journal/{journalId}/weblink/{weblinkId}', 'Journal\JournalController@getJournalWeblink');
 Route::get('journal/{id}', 'Journal\JournalController@getJournal');
 Route::post('journal/edit', 'Journal\JournalController@editJournal');
 Route::post('journal/create', 'Journal\JournalController@createJournal');
 Route::post('journal/comment/create', 'Journal\JournalController@createJournalComment');
 Route::post('journal/comment/edit', 'Journal\JournalController@editJournalComment');
 Route::post('journal/todo/create', 'Journal\JournalController@createJournalTodo');
 Route::post('journal/todo/edit', 'Journal\JournalController@editJournalTodo');
 Route::post('journal/note/create', 'Journal\JournalController@createJournalNote');
 Route::post('journal/note/edit', 'Journal\JournalController@editJournalNote');
 Route::post('journal/progress/create', 'Journal\JournalController@createJournalProgress');
 Route::post('journal/progress/edit', 'Journal\JournalController@editJournalProgress');
 Route::post('journal/weblink/create', 'Journal\JournalController@createJournalWeblink');
 Route::post('journal/weblink/edit', 'Journal\JournalController@editJournalWeblink');

 //Project
 Route::get('projects/all', 'Project\ProjectController@getProjectsAll');
 Route::get('projects/mine', 'Project\ProjectController@getProjectsMine');
 Route::get('projects/swipe', 'Project\ProjectController@getProjectSwipe');
 Route::get('projects/swipes', 'Project\ProjectController@getProjectSwipes');
 Route::post('projects/swipe/create', 'Project\ProjectController@createProjectSwipe');
 Route::get('project/{projectId}/comments', 'Project\ProjectController@getProjectComments');
 Route::get('project/{projectId}/comment/{commentId}', 'Project\ProjectController@getProjectComment');
 Route::get('project/{projectId}/todos', 'Project\ProjectController@getProjectTodos');
 Route::get('project/{projectId}/todo/{todoId}', 'Project\ProjectController@getProjectTodo');
 Route::get('project/{projectId}/notes', 'Project\ProjectController@getProjectNotes');
 Route::get('project/{projectId}/note/{noteId}', 'Project\ProjectController@getProjectNote');
 Route::get('project/{projectId}/progress', 'Project\ProjectController@getProjectProgress');
 Route::get('project/{projectId}/progress/{progressId}', 'Project\ProjectController@getProjectProgress');
 Route::get('project/{projectId}/weblinks', 'Project\ProjectController@getProjectWeblinks');
 Route::get('project/{projectId}/weblink/{weblinkId}', 'Project\ProjectController@getProjectWeblink');
 Route::get('project/{id}', 'Project\ProjectController@getProject');
 Route::post('project/edit', 'Project\ProjectController@editProject');
 Route::post('project/create', 'Project\ProjectController@createProject');
 Route::post('project/comment/create', 'Project\ProjectController@createProjectComment');
 Route::post('project/comment/edit', 'Project\ProjectController@editProjectComment');
 Route::post('project/todo/create', 'Project\ProjectController@createProjectTodo');
 Route::post('project/todo/edit', 'Project\ProjectController@editProjectTodo');
 Route::post('project/note/create', 'Project\ProjectController@createProjectNote');
 Route::post('project/note/edit', 'Project\ProjectController@editProjectNote');
 Route::post('project/progress/create', 'Project\ProjectController@createProjectProgress');
 Route::post('project/progress/edit', 'Project\ProjectController@editProjectProgress');
 Route::post('project/weblink/create', 'Project\ProjectController@createProjectWeblink');
 Route::post('project/weblink/edit', 'Project\ProjectController@editProjectWeblink');

 //Groups
 Route::get('groups/all', 'Group\GroupController@getGroupsAll');
 Route::get('groups/mine', 'Group\GroupController@getGroupsMine');
 Route::get('groups/swipe', 'Group\GroupController@getGroupSwipe');
 Route::get('groups/swipes', 'Group\GroupController@getGroupSwipes');
 Route::post('groups/swipe/create', 'Group\GroupController@createGroupSwipe');
 Route::get('group/{groupId}/comments', 'Group\GroupController@getGroupComments');
 Route::get('group/{groupId}/comment/{commentId}', 'Group\GroupController@getGroupComment');
 Route::get('group/{groupId}/todos', 'Group\GroupController@getGroupTodos');
 Route::get('group/{groupId}/todo/{todoId}', 'Group\GroupController@getGroupTodo');
 Route::get('group/{groupId}/notes', 'Group\GroupController@getGroupNotes');
 Route::get('group/{groupId}/note/{noteId}', 'Group\GroupController@getGroupNote');
 Route::get('group/{groupId}/progress', 'Group\GroupController@getGroupProgress');
 Route::get('group/{groupId}/progress/{progressId}', 'Group\GroupController@getGroupProgress');
 Route::get('group/{groupId}/weblinks', 'Group\GroupController@getGroupWeblinks');
 Route::get('group/{groupId}/weblink/{weblinkId}', 'Group\GroupController@getGroupWeblink');
 Route::get('group/{id}', 'Group\GroupController@getGroup');
 Route::post('group/edit', 'Group\GroupController@editGroup');
 Route::post('group/create', 'Group\GroupController@createGroup');
 Route::post('group/comment/create', 'Group\GroupController@createGroupComment');
 Route::post('group/comment/edit', 'Group\GroupController@editGroupComment');
 Route::post('group/todo/create', 'Group\GroupController@createGroupTodo');
 Route::post('group/todo/edit', 'Group\GroupController@editGroupTodo');
 Route::post('group/note/create', 'Group\GroupController@createGroupNote');
 Route::post('group/note/edit', 'Group\GroupController@editGroupNote');
 Route::post('group/progress/create', 'Group\GroupController@createGroupProgress');
 Route::post('group/progress/edit', 'Group\GroupController@editGroupProgress');
 Route::post('group/weblink/create', 'Group\GroupController@createGroupWeblink');
 Route::post('group/weblink/edit', 'Group\GroupController@editGroupWeblink');


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

 Route::get('constants/apptypes', 'ConstantsController@getAppTypes');
 Route::get('constants/level/{code}', 'ConstantsController@getLevel');
 Route::get('constants/icons/{type}', 'ConstantsController@getIcons');

 //Activity
 Route::get('activity/{activityId}/activities', 'Activity\ActivityController@getSubActivities');
 Route::get('activity/{activityId}/questions', 'Activity\ActivityController@getActivityQuestions');

 Route::post('activity/editstatus', 'Activity\ActivityController@editActivityStatus');
 Route::get('activity/{activityId}/checklist/data', 'Activity\ActivityController@activityChecklistStatusData');

 Route::get('activity/{activityId}/checklist', 'Explorer\ExplorerController@getExplorerActivityChecklist');
 Route::post('activity/checklist/create', 'Explorer\ExplorerController@createExplorerActivityChecklist');
 Route::post('activity/checklist/edit', 'Explorer\ExplorerController@editExplorerActivityChecklist');

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
