<?php

namespace App\Http\Controllers\Project;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Project\Project;
use App\Models\Project\ProjectProgress;
use App\Models\Project\ProjectComment;
use App\Models\Project\ProjectNote;
use App\Models\Project\ProjectTodo;
use App\Models\Project\ProjectWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Progress\Progress;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Project\ProjectSwipe;
use Request;
use DB;

class ProjectController extends Controller {

 public function getProjectsAll() {
  $projects = Project::getProjectsAll();
  return \Response::json($projects);
 }

 public function getSubProjects($projectId) {
  $projects = Project::getSubProjects($projectId);
  return \Response::json($projects);
 }

 public function getProjects($appName) {
  $projects = Project::getProjects($appName);
  return \Response::json($projects);
 }

 public function getProjectsMine() {
  $projects = Project::getProjectsMine();
  return \Response::json($projects);
 }

 public function getProject($id) {
  $project = Project::getProject($id);
  return \Response::json($project);
 }

 public function createProject() {
  $project = Project::createProject();
  return \Response::json($project);
 }

 public function editProject() {
  $project = Project::editProject();
  return \Response::json($project);
 }

 public function getProjectProgress($projectId) {
  $projectProgress = ProjectProgress::getProjectProgress($projectId);
  return \Response::json($projectProgress);
 }

 public function getProjectProgressItem($projectId, $progressId) {
  $projectProgress = ProjectProgress::getProjectProgress($projectId, $progressId);
  return \Response::json($projectProgress);
 }

 public function createProjectProgress() {
  $projectProgress = ProjectProgress::createProjectProgress();
  return \Response::json($projectProgress);
 }

 public function editProjectProgress() {
  $projectProgress = ProjectProgress::editProjectProgress();
  return \Response::json($projectProgress);
 }

 /* TODOS */

 public function getProjectTodos($projectId) {
  $projectTodos = ProjectTodo::getProjectTodos($projectId);
  return \Response::json($projectTodos);
 }

 public function getProjectTodo($projectId, $todoId) {
  $projectTodo = ProjectTodo::getProjectTodo($projectId, $todoId);
  return \Response::json($projectTodo);
 }

 public function createProjectTodo() {
  $projectTodo = ProjectTodo::createProjectTodo();
  return \Response::json($projectTodo);
 }

 public function editProjectTodo() {
  $projectTodo = ProjectTodo::editProjectTodo();
  return \Response::json($projectTodo);
 }

 public function getProjectTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createProjectTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editProjectTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getProjectNotes($projectId) {
  $projectNotes = ProjectNote::getProjectNotes($projectId);
  return \Response::json($projectNotes);
 }

 public function getProjectNote($projectId, $noteId) {
  $projectNote = ProjectNote::getProjectNote($projectId, $noteId);
  return \Response::json($projectNote);
 }

 public function createProjectNote() {
  $projectNote = ProjectNote::createProjectNote();
  return \Response::json($projectNote);
 }

 public function editProjectNote() {
  $projectNote = ProjectNote::editProjectNote();
  return \Response::json($projectNote);
 }

 public function getProjectComments($projectId) {
  $projectComments = ProjectComment::getProjectComments($projectId);
  return \Response::json($projectComments);
 }

 public function getProjectComment($projectId, $commentId) {
  $projectComment = ProjectComment::getProjectComment($projectId, $commentId);
  return \Response::json($projectComment);
 }

 public function createProjectComment() {
  $projectComment = ProjectComment::createProjectComment();
  return \Response::json($projectComment);
 }

 public function editProjectComment() {
  $projectComment = ProjectComment::editProjectComment();
  return \Response::json($projectComment);
 }

 public function getProjectWeblinks($projectId) {
  $projectWeblinks = ProjectWeblink::getProjectWeblinks($projectId);
  return \Response::json($projectWeblinks);
 }

 public function getProjectWeblink($projectId, $weblinkId) {
  $projectWeblink = ProjectWeblink::getProjectWeblink($projectId, $weblinkId);
  return \Response::json($projectWeblink);
 }

 public function createProjectWeblink() {
  $projectWeblink = ProjectWeblink::createProjectWeblink();
  return \Response::json($projectWeblink);
 }

 public function editProjectWeblink() {
  $projectWeblink = ProjectWeblink::editProjectWeblink();
  return \Response::json($projectWeblink);
 }

 //SWIPE
 public function getProjectSwipes() {
  $projectSwipes = ProjectSwipe::getProjectSwipes();
  return \Response::json($projectSwipes);
 }

 public function getProjectSwipe() {
  $projectSwipe = ProjectSwipe::getProjectSwipe();
  return \Response::json($projectSwipe);
 }

 public function createProjectSwipe() {
  $projectSwipe = ProjectSwipe::createProjectSwipe();
  return \Response::json($projectSwipe);
 }

}
