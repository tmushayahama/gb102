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
 Route::get('skills', 'Skill\SkillController@getSkills');
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




 Route::get('constants/level/{code}', 'ConstantsController@getLevel');



 //Todos
 Route::get('todo/{todoId}/checklist', 'Skill\SkillController@getSkillTodoChecklist');
 Route::post('todo/checklist/create', 'Skill\SkillController@createSkillTodoChecklist');
 Route::post('todo/checklist/edit', 'Skill\SkillController@editSkillTodoChecklist');
});


