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
 Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
 Route::get('skills/all', 'Skill\SkillController@getSkills');
 Route::get('skills/myskills', 'Skill\SkillController@getSkills');
 Route::get('skill/{skillId}/comments', 'Skill\SkillController@getSkillComments');
 Route::get('skill/{skillId}/comment/{commentId}', 'Skill\SkillController@getSkillComment');
 Route::get('skill/{skillId}/todos', 'Skill\SkillController@getSkillTodos');
 Route::get('skill/{skillId}/todo/{todoId}', 'Skill\SkillController@getSkillTodo');
 Route::get('skill/{skillId}/notes', 'Skill\SkillController@getSkillNotes');
 Route::get('skill/{skillId}/note/{noteId}', 'Skill\SkillController@getSkillNote');
 Route::get('skill/{skillId}/timelines', 'Skill\SkillController@getSkillTimelines');
 Route::get('skill/{skillId}/timeline/{timelineId}', 'Skill\SkillController@getSkillTimeline');
 Route::get('skill/{skillId}/weblinks', 'Skill\SkillController@getSkillWeblinks');
 Route::get('skill/{skillId}/weblink/{weblinkId}', 'Skill\SkillController@getSkillWeblink');
 Route::get('skill/{id}', 'Skill\SkillController@getSkill');
 Route::post('skill/edit', 'Skill\SkillController@editSkill');
 Route::post('skill/create', 'Skill\SkillController@createSkill');
 Route::post('skill/comment/create', 'Skill\SkillController@createSkillComment');
 Route::post('skill/comment/edit', 'Skill\SkillController@editSkillComment');
 Route::post('skill/todo/create', 'Skill\SkillController@createSkillTodo');
 Route::post('skill/todo/edit', 'Skill\SkillController@editSkillTodo');
 Route::post('skill/note/create', 'Skill\SkillController@createSkillNote');
 Route::post('skill/note/edit', 'Skill\SkillController@editSkillNote');
 Route::post('skill/timeline/create', 'Skill\SkillController@createSkillTimeline');
 Route::post('skill/timeline/edit', 'Skill\SkillController@editSkillTimeline');
 Route::post('skill/weblink/create', 'Skill\SkillController@createSkillWeblink');
 Route::post('skill/weblink/edit', 'Skill\SkillController@editSkillWeblink');

 //Goal
 Route::get('goals', 'Goal\GoalController@getGoals');
 Route::get('goal/{goalId}/comments', 'Goal\GoalController@getGoalComments');
 Route::get('goal/{goalId}/comment/{commentId}', 'Goal\GoalController@getGoalComment');
 Route::get('goal/{goalId}/todos', 'Goal\GoalController@getGoalTodos');
 Route::get('goal/{goalId}/todo/{todoId}', 'Goal\GoalController@getGoalTodo');
 Route::get('goal/{goalId}/notes', 'Goal\GoalController@getGoalNotes');
 Route::get('goal/{goalId}/note/{noteId}', 'Goal\GoalController@getGoalNote');
 Route::get('goal/{goalId}/timelines', 'Goal\GoalController@getGoalTimelines');
 Route::get('goal/{goalId}/timeline/{timelineId}', 'Goal\GoalController@getGoalTimeline');
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
 Route::post('goal/timeline/create', 'Goal\GoalController@createGoalTimeline');
 Route::post('goal/timeline/edit', 'Goal\GoalController@editGoalTimeline');
 Route::post('goal/weblink/create', 'Goal\GoalController@createGoalWeblink');
 Route::post('goal/weblink/edit', 'Goal\GoalController@editGoalWeblink');

//promise
 Route::get('promises', 'Promise\PromiseController@getPromises');
 Route::get('promise/{promiseId}/comments', 'Promise\PromiseController@getPromiseComments');
 Route::get('promise/{promiseId}/comment/{commentId}', 'Promise\PromiseController@getPromiseComment');
 Route::get('promise/{promiseId}/todos', 'Promise\PromiseController@getPromiseTodos');
 Route::get('promise/{promiseId}/todo/{todoId}', 'Promise\PromiseController@getPromiseTodo');
 Route::get('promise/{promiseId}/notes', 'Promise\PromiseController@getPromiseNotes');
 Route::get('promise/{promiseId}/note/{noteId}', 'Promise\PromiseController@getPromiseNote');
 Route::get('promise/{promiseId}/timelines', 'Promise\PromiseController@getPromiseTimelines');
 Route::get('promise/{promiseId}/timeline/{timelineId}', 'Promise\PromiseController@getPromiseTimeline');
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
 Route::post('promise/timeline/create', 'Promise\PromiseController@createPromiseTimeline');
 Route::post('promise/timeline/edit', 'Promise\PromiseController@editPromiseTimeline');
 Route::post('promise/weblink/create', 'Promise\PromiseController@createPromiseWeblink');
 Route::post('promise/weblink/edit', 'Promise\PromiseController@editPromiseWeblink');

 //Hobbys
 Route::get('hobbys', 'Hobby\HobbyController@getHobbys');
 Route::get('hobby/{hobbyId}/comments', 'Hobby\HobbyController@getHobbyComments');
 Route::get('hobby/{hobbyId}/comment/{commentId}', 'Hobby\HobbyController@getHobbyComment');
 Route::get('hobby/{hobbyId}/todos', 'Hobby\HobbyController@getHobbyTodos');
 Route::get('hobby/{hobbyId}/todo/{todoId}', 'Hobby\HobbyController@getHobbyTodo');
 Route::get('hobby/{hobbyId}/notes', 'Hobby\HobbyController@getHobbyNotes');
 Route::get('hobby/{hobbyId}/note/{noteId}', 'Hobby\HobbyController@getHobbyNote');
 Route::get('hobby/{hobbyId}/timelines', 'Hobby\HobbyController@getHobbyTimelines');
 Route::get('hobby/{hobbyId}/timeline/{timelineId}', 'Hobby\HobbyController@getHobbyTimeline');
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
 Route::post('hobby/timeline/create', 'Hobby\HobbyController@createHobbyTimeline');
 Route::post('hobby/timeline/edit', 'Hobby\HobbyController@editHobbyTimeline');
 Route::post('hobby/weblink/create', 'Hobby\HobbyController@createHobbyWeblink');
 Route::post('hobby/weblink/edit', 'Hobby\HobbyController@editHobbyWeblink');

 //Mentorship
 Route::get('mentorships', 'Mentorship\MentorshipController@getMentorships');
 Route::get('mentorship/{mentorshipId}/comments', 'Mentorship\MentorshipController@getMentorshipComments');
 Route::get('mentorship/{mentorshipId}/comment/{commentId}', 'Mentorship\MentorshipController@getMentorshipComment');
 Route::get('mentorship/{mentorshipId}/todos', 'Mentorship\MentorshipController@getMentorshipTodos');
 Route::get('mentorship/{mentorshipId}/todo/{todoId}', 'Mentorship\MentorshipController@getMentorshipTodo');
 Route::get('mentorship/{mentorshipId}/notes', 'Mentorship\MentorshipController@getMentorshipNotes');
 Route::get('mentorship/{mentorshipId}/note/{noteId}', 'Mentorship\MentorshipController@getMentorshipNote');
 Route::get('mentorship/{mentorshipId}/timelines', 'Mentorship\MentorshipController@getMentorshipTimelines');
 Route::get('mentorship/{mentorshipId}/timeline/{timelineId}', 'Mentorship\MentorshipController@getMentorshipTimeline');
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
 Route::post('mentorship/timeline/create', 'Mentorship\MentorshipController@createMentorshipTimeline');
 Route::post('mentorship/timeline/edit', 'Mentorship\MentorshipController@editMentorshipTimeline');
 Route::post('mentorship/weblink/create', 'Mentorship\MentorshipController@createMentorshipWeblink');
 Route::post('mentorship/weblink/edit', 'Mentorship\MentorshipController@editMentorshipWeblink');

//Advice
 Route::get('advices', 'Advice\AdviceController@getAdvices');
 Route::get('advice/{adviceId}/comments', 'Advice\AdviceController@getAdviceComments');
 Route::get('advice/{adviceId}/comment/{commentId}', 'Advice\AdviceController@getAdviceComment');
 Route::get('advice/{adviceId}/todos', 'Advice\AdviceController@getAdviceTodos');
 Route::get('advice/{adviceId}/todo/{todoId}', 'Advice\AdviceController@getAdviceTodo');
 Route::get('advice/{adviceId}/notes', 'Advice\AdviceController@getAdviceNotes');
 Route::get('advice/{adviceId}/note/{noteId}', 'Advice\AdviceController@getAdviceNote');
 Route::get('advice/{adviceId}/timelines', 'Advice\AdviceController@getAdviceTimelines');
 Route::get('advice/{adviceId}/timeline/{timelineId}', 'Advice\AdviceController@getAdviceTimeline');
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
 Route::post('advice/timeline/create', 'Advice\AdviceController@createAdviceTimeline');
 Route::post('advice/timeline/edit', 'Advice\AdviceController@editAdviceTimeline');
 Route::post('advice/weblink/create', 'Advice\AdviceController@createAdviceWeblink');
 Route::post('advice/weblink/edit', 'Advice\AdviceController@editAdviceWeblink');

 Route::get('constants/level/{code}', 'ConstantsController@getLevel');



 //Todos
 Route::get('todo/{todoId}/checklist', 'Skill\SkillController@getSkillTodoChecklist');
 Route::post('todo/checklist/create', 'Skill\SkillController@createSkillTodoChecklist');
 Route::post('todo/checklist/edit', 'Skill\SkillController@editSkillTodoChecklist');
});


