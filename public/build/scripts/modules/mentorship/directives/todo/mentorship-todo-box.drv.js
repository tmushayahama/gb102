angular.module("app.mentorship").directive("gbMentorshipTodoBox",["MentorshipTodosSrv","level_categories","$q",function(MentorshipTodosSrv,level_categories,$q){"use strict";return{restrict:"EA",replace:!0,templateUrl:"public/build/scripts/modules/mentorship/views/templates/todo/mentorship-todo-box.tpl.html",scope:{mentorshipTodo:"=",openMentorshipTodo:"&"},controller:["$scope",function($scope){}],link:function(scope,element,attr,ctrl){scope.todoChecklistStatusData,scope.mentorshipTodosSrv=new MentorshipTodosSrv,scope.open=function(){scope.openMentorshipTodo({mentorshipTodo:scope.mentorshipTodo})},scope.getTodoChecklistStatusData=function(todoId){scope.mentorshipTodosSrv.todoChecklistStatusData(todoId).then(function(data){scope.todoChecklistStatusData=data})},scope.getTodoChecklistStatusData(scope.mentorshipTodo.todo_id)}}}]);