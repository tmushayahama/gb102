<?php

namespace App\Http\Controllers\Questionnaire;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Question\QuestionAnswer;
use App\Models\Questionnaire\Questionnaire;
use App\Models\Questionnaire\QuestionnaireComment;
use App\Models\Questionnaire\QuestionnaireNote;
use App\Models\Questionnaire\QuestionnaireQuestion;
use App\Models\Questionnaire\QuestionnaireTimeline;
use App\Models\Questionnaire\QuestionnaireTodo;
use App\Models\Questionnaire\QuestionnaireWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Explore\Explore;
use Request;
use DB;

class QuestionnaireController extends Controller {

 public function getQuestionAnswers() {
  $questionAnswers = QuestionAnswer::getQuestionAnswers();
  return \Response::json($questionAnswers);
 }

 public function createQuestionAnswer() {
  $questionAnswer = QuestionAnswer::createQuestionAnswer();
  return \Response::json($questionAnswer);
 }

 public function getQuestionnaireQuestion($questionnaireId) {
  $questionnaireQuestion = QuestionnaireQuestion::getQuestionnaireQuestion($questionnaireId);
  return \Response::json($questionnaireQuestion);
 }

 public function getQuestionnairesMine() {
  $questionnaires = Questionnaire::getQuestionnairesMine();
  return \Response::json($questionnaires);
 }

 public function getQuestionnaire() {
  $questionnaire = Questionnaire::getQuestionnaire();
  return \Response::json($questionnaire);
 }

 public function createQuestionnaire() {
  $questionnaire = Questionnaire::createQuestionnaire();
  return \Response::json($questionnaire);
 }

 public function editQuestionnaire() {
  $questionnaire = Questionnaire::editQuestionnaire();
  return \Response::json($questionnaire);
 }

 public function getQuestionnaireTimelines($questionnaireId) {
  $questionnaireTimelines = QuestionnaireTimeline::getQuestionnaireTimelines($questionnaireId);
  return \Response::json($questionnaireTimelines);
 }

 public function getQuestionnaireTimeline($questionnaireId, $timelineId) {
  $questionnaireTimeline = QuestionnaireTimeline::getQuestionnaireTimeline($questionnaireId, $timelineId);
  return \Response::json($questionnaireTimeline);
 }

 public function createQuestionnaireTimeline() {
  $questionnaireTimeline = QuestionnaireTimeline::createQuestionnaireTimeline();
  return \Response::json($questionnaireTimeline);
 }

 public function editQuestionnaireTimeline() {
  $questionnaireTimeline = QuestionnaireTimeline::editQuestionnaireTimeline();
  return \Response::json($questionnaireTimeline);
 }

 /* TODOS */

 public function getQuestionnaireTodos($questionnaireId) {
  $questionnaireTodos = QuestionnaireTodo::getQuestionnaireTodos($questionnaireId);
  return \Response::json($questionnaireTodos);
 }

 public function getQuestionnaireTodo($questionnaireId, $todoId) {
  $questionnaireTodo = QuestionnaireTodo::getQuestionnaireTodo($questionnaireId, $todoId);
  return \Response::json($questionnaireTodo);
 }

 public function createQuestionnaireTodo() {
  $questionnaireTodo = QuestionnaireTodo::createQuestionnaireTodo();
  return \Response::json($questionnaireTodo);
 }

 public function editQuestionnaireTodo() {
  $questionnaireTodo = QuestionnaireTodo::editQuestionnaireTodo();
  return \Response::json($questionnaireTodo);
 }

 public function getQuestionnaireTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createQuestionnaireTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editQuestionnaireTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getQuestionnaireNotes($questionnaireId) {
  $questionnaireNotes = QuestionnaireNote::getQuestionnaireNotes($questionnaireId);
  return \Response::json($questionnaireNotes);
 }

 public function getQuestionnaireNote($questionnaireId, $noteId) {
  $questionnaireNote = QuestionnaireNote::getQuestionnaireNote($questionnaireId, $noteId);
  return \Response::json($questionnaireNote);
 }

 public function createQuestionnaireNote() {
  $questionnaireNote = QuestionnaireNote::createQuestionnaireNote();
  return \Response::json($questionnaireNote);
 }

 public function editQuestionnaireNote() {
  $questionnaireNote = QuestionnaireNote::editQuestionnaireNote();
  return \Response::json($questionnaireNote);
 }

 public function getQuestionnaireComments($questionnaireId) {
  $questionnaireComments = QuestionnaireComment::getQuestionnaireComments($questionnaireId);
  return \Response::json($questionnaireComments);
 }

 public function getQuestionnaireComment($questionnaireId, $commentId) {
  $questionnaireComment = QuestionnaireComment::getQuestionnaireComment($questionnaireId, $commentId);
  return \Response::json($questionnaireComment);
 }

 public function createQuestionnaireComment() {
  $questionnaireComment = QuestionnaireComment::createQuestionnaireComment();
  return \Response::json($questionnaireComment);
 }

 public function editQuestionnaireComment() {
  $questionnaireComment = QuestionnaireComment::editQuestionnaireComment();
  return \Response::json($questionnaireComment);
 }

 public function getQuestionnaireWeblinks($questionnaireId) {
  $questionnaireWeblinks = QuestionnaireWeblink::getQuestionnaireWeblinks($questionnaireId);
  return \Response::json($questionnaireWeblinks);
 }

 public function getQuestionnaireWeblink($questionnaireId, $weblinkId) {
  $questionnaireWeblink = QuestionnaireWeblink::getQuestionnaireWeblink($questionnaireId, $weblinkId);
  return \Response::json($questionnaireWeblink);
 }

 public function createQuestionnaireWeblink() {
  $questionnaireWeblink = QuestionnaireWeblink::createQuestionnaireWeblink();
  return \Response::json($questionnaireWeblink);
 }

 public function editQuestionnaireWeblink() {
  $questionnaireWeblink = QuestionnaireWeblink::editQuestionnaireWeblink();
  return \Response::json($questionnaireWeblink);
 }

 //QUESTIONNAIRE
 public function getQuestionnaireQuestionnaires() {
  $questionnaireQuestionnaires = QuestionnaireQuestionnaire::getQuestionnaireQuestionnaires();
  return \Response::json($questionnaireQuestionnaires);
 }

 public function getQuestionnaireQuestionnaire() {
  $questionnaireQuestionnaire = QuestionnaireQuestionnaire::getQuestionnaireQuestionnaire();
  return \Response::json($questionnaireQuestionnaire);
 }

 public function createQuestionnaireQuestionnaire() {
  $questionnaireQuestionnaire = QuestionnaireQuestionnaire::createQuestionnaireQuestionnaire();
  return \Response::json($questionnaireQuestionnaire);
 }

}
