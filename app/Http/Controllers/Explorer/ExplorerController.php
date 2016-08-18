<?php

namespace App\Http\Controllers\Explorer;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Explorer\Explorer;
use App\Models\Explorer\ExplorerActivity;
use App\Models\Explorer\ExplorerComment;
use App\Models\Explorer\ExplorerContribution;
use App\Models\Explorer\ExplorerDiscussion;
use App\Models\Explorer\ExplorerExercise;
use App\Models\Explorer\ExplorerGuideline;
use App\Models\Explorer\ExplorerNote;
use App\Models\Explorer\ExplorerObjective;
use App\Models\Explorer\ExplorerPlan;
use App\Models\Plan\PlanChecklist;
use App\Models\Explorer\ExplorerQuestion;
use App\Models\Explorer\ExplorerRelationship;
use App\Models\Explorer\ExplorerRequestOption;
use App\Models\Explorer\ExplorerTodo;
use App\Models\Explorer\ExplorerWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Comment\Comment;
use App\Models\Contribution\Contribution;
use App\Models\Note\Note;
use App\Models\Question\QuestionAnswer;
use App\Models\Weblink\Weblink;
use App\Models\Explorer\ExplorerSwipe;
use Request;
use DB;

class ExplorerController extends Controller {

 public function getExplorersAll() {
  $explorers = Explorer::getExplorersAll();
  return \Response::json($explorers);
 }

 public function getExplorersByMode($mode) {
  $explorers = Explorer::getExplorersByMode($mode);
  return \Response::json($explorers);
 }

 public function getUserExplorersAll($userId) {
  $explorers = Explorer::getUserExplorersAll($userId);
  return \Response::json($explorers);
 }

 public function getUserExplorersAllStats($userId) {
  $explorersCount = Explorer::getUserExplorersAllStats($userId);
  return \Response::json($explorersCount);
 }

 public function getExplorers($appName) {
  $explorers = Explorer::getExplorers($appName, 40);
  return \Response::json($explorers);
 }

 public function getExplorersFeatured($appName) {
  $explorers = Explorer::getExplorers($appName, 6);
  return \Response::json($explorers);
 }

 public function getSubExplorers($explorerId, $type) {
  $explorers = ExplorerRelationship::getSubExplorers($explorerId, $type);
  return \Response::json($explorers);
 }

 public function getSubExplorersStats($explorerId) {
  $explorersStats = Explorer::getSubExplorersStats($explorerId);
  return \Response::json($explorersStats);
 }

 public function getUserExplorers($userId, $appName) {
  $explorers = Explorer::getUserExplorers($userId, $appName);
  return \Response::json($explorers);
 }

 public function getExplorersMine() {
  $explorers = Explorer::getExplorersMine();
  return \Response::json($explorers);
 }

 public function getExplorer($id) {
  $explorer = Explorer::getExplorer($id);
  return \Response::json($explorer);
 }

 public function createExplorer() {
  $explorer = Explorer::createExplorer();
  return \Response::json($explorer);
 }

 public function editExplorer() {
  $explorer = Explorer::editExplorer();
  return \Response::json($explorer);
 }

 public function getExplorerRequestOptions($explorerId) {
  $explorerRequestOptions = ExplorerRequestOption::getExplorerRequestOptions($explorerId);
  return \Response::json($explorerRequestOptions);
 }

 /* QUESTIONS */

 public function getExplorerQuestions($explorerId, $type) {
  $explorerQuestions = ExplorerQuestion::getExplorerQuestions($explorerId, $type);
  return \Response::json($explorerQuestions);
 }

 public function getExplorerQuestion($explorerId, $questionId) {
  $explorerQuestion = ExplorerQuestion::getExplorerQuestion($explorerId, $questionId);
  return \Response::json($explorerQuestion);
 }

 public function createExplorerQuestion() {
  $explorerQuestion = ExplorerQuestion::createExplorerQuestion();
  return \Response::json($explorerQuestion);
 }

 public function editExplorerQuestion() {
  $explorerQuestion = ExplorerQuestion::editExplorerQuestion();
  return \Response::json($explorerQuestion);
 }

 public function getExplorerSectionAnswersPreview($questionId, $explorerId) {
  $sectionAnswers = QuestionAnswer::getSectionAnswers($questionId, $explorerId, 15);
  return \Response::json($sectionAnswers);
 }

 public function getExplorerSectionAnswers($questionId, $explorerId) {
  $sectionAnswers = QuestionAnswer::getSectionAnswers($questionId, $explorerId);
  return \Response::json($sectionAnswers);
 }

 public function createExplorerSectionAnswer() {
  $sectionAnswers = QuestionAnswer::createQuestionAnswer();
  return \Response::json($sectionAnswers);
 }

 /* TODOS */

 public function getExplorerTodos($explorerId, $statusId) {
  $explorerTodos = ExplorerTodo::getExplorerTodos($explorerId, $statusId);
  return \Response::json($explorerTodos);
 }

 public function getExplorerTodo($explorerId, $todoId) {
  $explorerTodo = ExplorerTodo::getExplorerTodo($explorerId, $todoId);
  return \Response::json($explorerTodo);
 }

 public function createExplorerTodo() {
  $explorerTodo = ExplorerTodo::createExplorerTodo();
  return \Response::json($explorerTodo);
 }

 public function editExplorerTodo() {
  $explorerTodo = ExplorerTodo::editExplorerTodo();
  return \Response::json($explorerTodo);
 }

 public function getExplorerTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createExplorerTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editExplorerTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getExplorerActivities($explorerId) {
  $explorerActivities = ExplorerActivity::getExplorerActivities($explorerId);
  return \Response::json($explorerActivities);
 }

 public function getExplorerActivity($explorerId, $activityId) {
  $explorerActivity = ExplorerActivity::getExplorerActivity($explorerId, $activityId);
  return \Response::json($explorerActivity);
 }

 public function createExplorerActivity() {
  $explorerActivity = ExplorerActivity::createExplorerActivity();
  return \Response::json($explorerActivity);
 }

 public function editExplorerActivity() {
  $explorerActivity = ExplorerActivity::editExplorerActivity();
  return \Response::json($explorerActivity);
 }

 public function getExplorerExercises($explorerId) {
  $explorerExercises = ExplorerExercise::getExplorerExercises($explorerId);
  return \Response::json($explorerExercises);
 }

 public function getExplorerExercise($explorerId, $exerciseId) {
  $explorerExercise = ExplorerExercise::getExplorerExercise($explorerId, $exerciseId);
  return \Response::json($explorerExercise);
 }

 public function createExplorerExercise() {
  $explorerExercise = ExplorerExercise::createExplorerExercise();
  return \Response::json($explorerExercise);
 }

 public function editExplorerExercise() {
  $explorerExercise = ExplorerExercise::editExplorerExercise();
  return \Response::json($explorerExercise);
 }

 public function getExplorerGuidelines($explorerId) {
  $explorerGuidelines = ExplorerGuideline::getExplorerGuidelines($explorerId);
  return \Response::json($explorerGuidelines);
 }

 public function getExplorerGuideline($explorerId, $guidelineId) {
  $explorerGuideline = ExplorerGuideline::getExplorerGuideline($explorerId, $guidelineId);
  return \Response::json($explorerGuideline);
 }

 public function createExplorerGuideline() {
  $explorerGuideline = ExplorerGuideline::createExplorerGuideline();
  return \Response::json($explorerGuideline);
 }

 public function editExplorerGuideline() {
  $explorerGuideline = ExplorerGuideline::editExplorerGuideline();
  return \Response::json($explorerGuideline);
 }

 public function getExplorerNotes($explorerId) {
  $explorerNotes = ExplorerNote::getExplorerNotes($explorerId);
  return \Response::json($explorerNotes);
 }

 public function getExplorerNote($explorerId, $noteId) {
  $explorerNote = ExplorerNote::getExplorerNote($explorerId, $noteId);
  return \Response::json($explorerNote);
 }

 public function createExplorerNote() {
  $explorerNote = ExplorerNote::createExplorerNote();
  return \Response::json($explorerNote);
 }

 public function editExplorerNote() {
  $explorerNote = ExplorerNote::editExplorerNote();
  return \Response::json($explorerNote);
 }

 public function getExplorerObjectives($explorerId) {
  $explorerObjectives = ExplorerObjective::getExplorerObjectives($explorerId);
  return \Response::json($explorerObjectives);
 }

 public function getExplorerObjective($explorerId, $objectiveId) {
  $explorerObjective = ExplorerObjective::getExplorerObjective($explorerId, $objectiveId);
  return \Response::json($explorerObjective);
 }

 public function createExplorerObjective() {
  $explorerObjective = ExplorerObjective::createExplorerObjective();
  return \Response::json($explorerObjective);
 }

 public function editExplorerObjective() {
  $explorerObjective = ExplorerObjective::editExplorerObjective();
  return \Response::json($explorerObjective);
 }

 public function getExplorerPlans($explorerId) {
  $explorerPlans = ExplorerPlan::getExplorerPlans($explorerId);
  return \Response::json($explorerPlans);
 }

 public function getExplorerPlan($explorerId, $planId) {
  $explorerPlan = ExplorerPlan::getExplorerPlan($explorerId, $planId);
  return \Response::json($explorerPlan);
 }

 public function createExplorerPlan() {
  $explorerPlan = ExplorerPlan::createExplorerPlan();
  return \Response::json($explorerPlan);
 }

 public function editExplorerPlan() {
  $explorerPlan = ExplorerPlan::editExplorerPlan();
  return \Response::json($explorerPlan);
 }

 public function getExplorerPlanChecklist($planId) {
  $planChecklists = PlanChecklist::getPlanChecklist($planId);
  return \Response::json($planChecklists);
 }

 public function createExplorerPlanChecklist() {
  $planChecklist = PlanChecklist::createPlanChecklist();
  return \Response::json($planChecklist);
 }

 public function editExplorerPlanChecklist() {
  $planChecklist = PlanChecklist::editPlanChecklist();
  return \Response::json($planChecklist);
 }

 public function getExplorerComments($explorerId) {
  $explorerComments = ExplorerComment::getExplorerComments($explorerId);
  return \Response::json($explorerComments);
 }

 public function getExplorerComment($explorerId, $commentId) {
  $explorerComment = ExplorerComment::getExplorerComment($explorerId, $commentId);
  return \Response::json($explorerComment);
 }

 public function createExplorerComment() {
  $explorerComment = ExplorerComment::createExplorerComment();
  return \Response::json($explorerComment);
 }

 public function editExplorerComment() {
  $explorerComment = ExplorerComment::editExplorerComment();
  return \Response::json($explorerComment);
 }

 public function getExplorerContributions($explorerId) {
  $explorerContributions = ExplorerContribution::getExplorerContributions($explorerId);
  return \Response::json($explorerContributions);
 }

 public function getExplorerContribution($explorerId, $contributionId) {
  $explorerContribution = ExplorerContribution::getExplorerContribution($explorerId, $contributionId);
  return \Response::json($explorerContribution);
 }

 public function getExplorerContributionLevel($explorerId, $contributionId) {
  $level = ExplorerContribution::getExplorerContributionLevel($explorerId, $contributionId);
  return \Response::json($level);
 }

 public function createExplorerContribution() {
  $explorerContribution = ExplorerContribution::createExplorerContribution();
  return \Response::json($explorerContribution);
 }

 public function editExplorerContribution() {
  $explorerContribution = ExplorerContribution::editExplorerContribution();
  return \Response::json($explorerContribution);
 }

 public function getExplorerDiscussions($explorerId) {
  $explorerDiscussions = ExplorerDiscussion::getExplorerDiscussions($explorerId);
  return \Response::json($explorerDiscussions);
 }

 public function getExplorerDiscussion($explorerId, $discussionId) {
  $explorerDiscussion = ExplorerDiscussion::getExplorerDiscussion($explorerId, $discussionId);
  return \Response::json($explorerDiscussion);
 }

 public function createExplorerDiscussion() {
  $explorerDiscussion = ExplorerDiscussion::createExplorerDiscussion();
  return \Response::json($explorerDiscussion);
 }

 public function editExplorerDiscussion() {
  $explorerDiscussion = ExplorerDiscussion::editExplorerDiscussion();
  return \Response::json($explorerDiscussion);
 }

 public function getExplorerWeblinks($explorerId) {
  $explorerWeblinks = ExplorerWeblink::getExplorerWeblinks($explorerId);
  return \Response::json($explorerWeblinks);
 }

 public function getExplorerWeblink($explorerId, $weblinkId) {
  $explorerWeblink = ExplorerWeblink::getExplorerWeblink($explorerId, $weblinkId);
  return \Response::json($explorerWeblink);
 }

 public function createExplorerWeblink() {
  $explorerWeblink = ExplorerWeblink::createExplorerWeblink();
  return \Response::json($explorerWeblink);
 }

 public function editExplorerWeblink() {
  $explorerWeblink = ExplorerWeblink::editExplorerWeblink();
  return \Response::json($explorerWeblink);
 }

 //SWIPE
 public function getExplorerSwipes() {
  $explorerSwipes = ExplorerSwipe::getExplorerSwipes();
  return \Response::json($explorerSwipes);
 }

 public function getExplorerSwipe() {
  $explorerSwipe = ExplorerSwipe::getExplorerSwipe();
  return \Response::json($explorerSwipe);
 }

 public function createExplorerSwipe() {
  $explorerSwipe = ExplorerSwipe::createExplorerSwipe();
  return \Response::json($explorerSwipe);
 }

}
