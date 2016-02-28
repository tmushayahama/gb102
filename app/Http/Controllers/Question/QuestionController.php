<?php

namespace App\Http\Controllers\Question;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Question\QuestionAnswer;
use App\Models\Question\Question;
use App\Models\Question\QuestionComment;
use App\Models\Question\QuestionNote;
use App\Models\Question\QuestionQuestion;
use App\Models\Question\QuestionProgress;
use App\Models\Question\QuestionTodo;
use App\Models\Question\QuestionWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Progress\Progress;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Explorer\Explorer;
use Request;
use DB;

class QuestionController extends Controller {

 public function getQuestion($id) {
  $question = Question::getQuestion($id);
  return \Response::json($question);
 }

 public function getAllQuestionAnswers() {
  $questionAnswers = QuestionAnswer::getAllQuestionAnswers();
  return \Response::json($questionAnswers);
 }

 public function getQuestionAnswers($userId) {
  $questionAnswers = QuestionAnswer::getQuestionAnswers($userId);
  return \Response::json($questionAnswers);
 }

 public function createQuestionAnswer() {
  $questionAnswer = QuestionAnswer::createQuestionAnswer();
  return \Response::json($questionAnswer);
 }

 public function getQuestionsMine() {
  $questions = Question::getQuestionsMine();
  return \Response::json($questions);
 }

 public function createQuestion() {
  $question = Question::createQuestion();
  return \Response::json($question);
 }

 public function editQuestion() {
  $question = Question::editQuestion();
  return \Response::json($question);
 }

 public function getQuestionProgress($questionId) {
  $questionProgress = QuestionProgress::getQuestionProgress($questionId);
  return \Response::json($questionProgress);
 }

 public function getQuestionProgressItem($questionId, $progressId) {
  $questionProgress = QuestionProgress::getQuestionProgress($questionId, $progressId);
  return \Response::json($questionProgress);
 }

 public function createQuestionProgress() {
  $questionProgress = QuestionProgress::createQuestionProgress();
  return \Response::json($questionProgress);
 }

 public function editQuestionProgress() {
  $questionProgress = QuestionProgress::editQuestionProgress();
  return \Response::json($questionProgress);
 }

 /* TODOS */

 public function getQuestionTodos($questionId) {
  $questionTodos = QuestionTodo::getQuestionTodos($questionId);
  return \Response::json($questionTodos);
 }

 public function getQuestionTodo($questionId, $todoId) {
  $questionTodo = QuestionTodo::getQuestionTodo($questionId, $todoId);
  return \Response::json($questionTodo);
 }

 public function createQuestionTodo() {
  $questionTodo = QuestionTodo::createQuestionTodo();
  return \Response::json($questionTodo);
 }

 public function editQuestionTodo() {
  $questionTodo = QuestionTodo::editQuestionTodo();
  return \Response::json($questionTodo);
 }

 public function getQuestionTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createQuestionTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editQuestionTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getQuestionNotes($questionId) {
  $questionNotes = QuestionNote::getQuestionNotes($questionId);
  return \Response::json($questionNotes);
 }

 public function getQuestionNote($questionId, $noteId) {
  $questionNote = QuestionNote::getQuestionNote($questionId, $noteId);
  return \Response::json($questionNote);
 }

 public function createQuestionNote() {
  $questionNote = QuestionNote::createQuestionNote();
  return \Response::json($questionNote);
 }

 public function editQuestionNote() {
  $questionNote = QuestionNote::editQuestionNote();
  return \Response::json($questionNote);
 }

 public function getQuestionComments($questionId) {
  $questionComments = QuestionComment::getQuestionComments($questionId);
  return \Response::json($questionComments);
 }

 public function getQuestionComment($questionId, $commentId) {
  $questionComment = QuestionComment::getQuestionComment($questionId, $commentId);
  return \Response::json($questionComment);
 }

 public function createQuestionComment() {
  $questionComment = QuestionComment::createQuestionComment();
  return \Response::json($questionComment);
 }

 public function editQuestionComment() {
  $questionComment = QuestionComment::editQuestionComment();
  return \Response::json($questionComment);
 }

 public function getQuestionWeblinks($questionId) {
  $questionWeblinks = QuestionWeblink::getQuestionWeblinks($questionId);
  return \Response::json($questionWeblinks);
 }

 public function getQuestionWeblink($questionId, $weblinkId) {
  $questionWeblink = QuestionWeblink::getQuestionWeblink($questionId, $weblinkId);
  return \Response::json($questionWeblink);
 }

 public function createQuestionWeblink() {
  $questionWeblink = QuestionWeblink::createQuestionWeblink();
  return \Response::json($questionWeblink);
 }

 public function editQuestionWeblink() {
  $questionWeblink = QuestionWeblink::editQuestionWeblink();
  return \Response::json($questionWeblink);
 }

 //QUESTIONNAIRE
 public function getQuestionQuestions() {
  $questionQuestions = QuestionQuestion::getQuestionQuestions();
  return \Response::json($questionQuestions);
 }

 public function getQuestionQuestion() {
  $questionQuestion = QuestionQuestion::getQuestionQuestion();
  return \Response::json($questionQuestion);
 }

 public function createQuestionQuestion() {
  $questionQuestion = QuestionQuestion::createQuestionQuestion();
  return \Response::json($questionQuestion);
 }

}
