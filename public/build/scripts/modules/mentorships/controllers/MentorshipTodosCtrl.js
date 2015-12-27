var mentorshipTodosCtrl=function(MentorshipTodosManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log){var vm=this;vm.mentorshipId=$stateParams.mentorshipId,vm.mentorshipTodosManager=new MentorshipTodosManager,vm.todoFormDisplay=!1,vm.defaultMentorshipTodoData={mentorshipId:$stateParams.mentorshipId,privacy:0},vm.newMentorshipTodoData=angular.copy(vm.defaultMentorshipTodoData),vm.showTodoForm=function(){vm.todoFormDisplay=!0},vm.createMentorshipTodo=function(data){vm.mentorshipTodosManager.createMentorshipTodo(data).then(function(response){vm.todoFormDisplay=!1,vm.newMentorshipTodoData=angular.copy(vm.defaultMentorshipTodoData)},function(response){console.log(response)})},vm.editMentorshipTodo=function(data){vm.mentorshipTodosManager.editMentorshipTodo(data).then(function(response){vm.todoFormDisplay=!1,vm.newMentorshipTodoData=angular.copy(vm.defaultMentorshipTodoData)},function(response){console.log(response)})},vm.editMentorshipTodoSections={title:function(mentorshipTodoId,title){var mentorshipTodoData={mentorshipTodoId:mentorshipTodoId,title:title};vm.editMentorshipTodo(mentorshipTodoData)}},vm.cancelMentorshipTodo=function(form){vm.todoFormDisplay=!1,vm.newMentorshipTodoData=angular.copy(vm.defaultMentorshipTodoData),form&&(form.$setPristine(),form.$setUntouched())},vm.editedTodo=null,$scope.$watch(angular.bind(this,function(){return vm.mentorshipTodos}),function(){vm.doneCount=vm.mentorshipTodosManager.mentorshipTodos.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTodo=function(mentorshipTodo){vm.editedTodo=mentorshipTodo,vm.originalTodo=angular.copy(mentorshipTodo)},vm.doneEditing=function(mentorshipTodo){vm.editedTodo=null,mentorshipTodo.title=mentorshipTodo.title.trim(),mentorshipTodo.title||vm.removeTodo(mentorshipTodo)},vm.openMentorshipTodo=function(mentorshipTodo){var modalInstance=$uibModal.open({animation:!0,templateUrl:"mentorship-todo-modal.html",controller:"MentorshipTodoCtrl as mentorshipTodoCtrl",backdrop:"static",size:"xl",resolve:{mentorshipTodoData:function(){return mentorshipTodo}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.mentorshipTodosManager.getMentorshipTodos(vm.mentorshipId)};mentorshipTodosCtrl.$inject=["MentorshipTodosManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log"],angular.module("app.mentorships").controller("MentorshipTodosCtrl",mentorshipTodosCtrl);