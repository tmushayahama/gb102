<?php

namespace App\Http\Controllers\Todo;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use Request;
use DB;

class TodoController extends Controller {

 public function editTodoStatus() {
  $todo = Todo::editTodoStatus();
  return \Response::json($todo);
 }

 public function getTodoChecklist($todoId) {
  $todoTodos = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoTodos);
 }

 public function createTodoChecklist() {
  $todoTodos = TodoChecklist::createTodoChecklist();
  return \Response::json($todoTodos);
 }

}
