<?php

namespace App\Http\Controllers\Goal;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Goal\Goal;
use App\Models\Goal\GoalProgress;
use App\Models\Goal\GoalComment;
use App\Models\Goal\GoalNote;
use App\Models\Goal\GoalTodo;
use App\Models\Goal\GoalWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Progress\Progress;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Goal\GoalSwipe;
use Request;
use DB;

class GoalController extends Controller {

 public function getGoalsAll() {
  $goals = Goal::getGoalsAll();
  return \Response::json($goals);
 }

 public function getSubGoals($goalId) {
  $goals = Goal::getSubGoals($goalId);
  return \Response::json($goals);
 }

 public function getGoals($appName) {
  $goals = Goal::getGoals($appName);
  return \Response::json($goals);
 }

 public function getGoalsMine() {
  $goals = Goal::getGoalsMine();
  return \Response::json($goals);
 }

 public function getGoal($id) {
  $goal = Goal::getGoal($id);
  return \Response::json($goal);
 }

 public function createGoal() {
  $goal = Goal::createGoal();
  return \Response::json($goal);
 }

 public function editGoal() {
  $goal = Goal::editGoal();
  return \Response::json($goal);
 }

 public function getGoalProgress($goalId) {
  $goalProgress = GoalProgress::getGoalProgress($goalId);
  return \Response::json($goalProgress);
 }

 public function getGoalProgress($goalId, $progressId) {
  $goalProgress = GoalProgress::getGoalProgress($goalId, $progressId);
  return \Response::json($goalProgress);
 }

 public function createGoalProgress() {
  $goalProgress = GoalProgress::createGoalProgress();
  return \Response::json($goalProgress);
 }

 public function editGoalProgress() {
  $goalProgress = GoalProgress::editGoalProgress();
  return \Response::json($goalProgress);
 }

 /* TODOS */

 public function getGoalTodos($goalId) {
  $goalTodos = GoalTodo::getGoalTodos($goalId);
  return \Response::json($goalTodos);
 }

 public function getGoalTodo($goalId, $todoId) {
  $goalTodo = GoalTodo::getGoalTodo($goalId, $todoId);
  return \Response::json($goalTodo);
 }

 public function createGoalTodo() {
  $goalTodo = GoalTodo::createGoalTodo();
  return \Response::json($goalTodo);
 }

 public function editGoalTodo() {
  $goalTodo = GoalTodo::editGoalTodo();
  return \Response::json($goalTodo);
 }

 public function getGoalTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createGoalTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editGoalTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getGoalNotes($goalId) {
  $goalNotes = GoalNote::getGoalNotes($goalId);
  return \Response::json($goalNotes);
 }

 public function getGoalNote($goalId, $noteId) {
  $goalNote = GoalNote::getGoalNote($goalId, $noteId);
  return \Response::json($goalNote);
 }

 public function createGoalNote() {
  $goalNote = GoalNote::createGoalNote();
  return \Response::json($goalNote);
 }

 public function editGoalNote() {
  $goalNote = GoalNote::editGoalNote();
  return \Response::json($goalNote);
 }

 public function getGoalComments($goalId) {
  $goalComments = GoalComment::getGoalComments($goalId);
  return \Response::json($goalComments);
 }

 public function getGoalComment($goalId, $commentId) {
  $goalComment = GoalComment::getGoalComment($goalId, $commentId);
  return \Response::json($goalComment);
 }

 public function createGoalComment() {
  $goalComment = GoalComment::createGoalComment();
  return \Response::json($goalComment);
 }

 public function editGoalComment() {
  $goalComment = GoalComment::editGoalComment();
  return \Response::json($goalComment);
 }

 public function getGoalWeblinks($goalId) {
  $goalWeblinks = GoalWeblink::getGoalWeblinks($goalId);
  return \Response::json($goalWeblinks);
 }

 public function getGoalWeblink($goalId, $weblinkId) {
  $goalWeblink = GoalWeblink::getGoalWeblink($goalId, $weblinkId);
  return \Response::json($goalWeblink);
 }

 public function createGoalWeblink() {
  $goalWeblink = GoalWeblink::createGoalWeblink();
  return \Response::json($goalWeblink);
 }

 public function editGoalWeblink() {
  $goalWeblink = GoalWeblink::editGoalWeblink();
  return \Response::json($goalWeblink);
 }

 //SWIPE
 public function getGoalSwipes() {
  $goalSwipes = GoalSwipe::getGoalSwipes();
  return \Response::json($goalSwipes);
 }

 public function getGoalSwipe() {
  $goalSwipe = GoalSwipe::getGoalSwipe();
  return \Response::json($goalSwipe);
 }

 public function createGoalSwipe() {
  $goalSwipe = GoalSwipe::createGoalSwipe();
  return \Response::json($goalSwipe);
 }

}
