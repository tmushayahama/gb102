var journalTodosCtrl=function(JournalTodosManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log){var vm=this;vm.journalId=$stateParams.journalId,vm.journalTodosManager=new JournalTodosManager,vm.todoFormDisplay=!1,vm.defaultJournalTodoData={journalId:$stateParams.journalId,privacy:0},vm.newJournalTodoData=angular.copy(vm.defaultJournalTodoData),vm.showTodoForm=function(){vm.todoFormDisplay=!0},vm.createJournalTodo=function(data){vm.journalTodosManager.createJournalTodo(data).then(function(response){vm.todoFormDisplay=!1,vm.newJournalTodoData=angular.copy(vm.defaultJournalTodoData)},function(response){console.log(response)})},vm.editJournalTodo=function(data){vm.journalTodosManager.editJournalTodo(data).then(function(response){vm.todoFormDisplay=!1,vm.newJournalTodoData=angular.copy(vm.defaultJournalTodoData)},function(response){console.log(response)})},vm.editJournalTodoSections={title:function(journalTodoId,title){var journalTodoData={journalTodoId:journalTodoId,title:title};vm.editJournalTodo(journalTodoData)}},vm.cancelJournalTodo=function(form){vm.todoFormDisplay=!1,vm.newJournalTodoData=angular.copy(vm.defaultJournalTodoData),form&&(form.$setPristine(),form.$setUntouched())},vm.editedTodo=null,$scope.$watch(angular.bind(this,function(){return vm.journalTodos}),function(){vm.doneCount=vm.journalTodosManager.journalTodos.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTodo=function(journalTodo){vm.editedTodo=journalTodo,vm.originalTodo=angular.copy(journalTodo)},vm.doneEditing=function(journalTodo){vm.editedTodo=null,journalTodo.title=journalTodo.title.trim(),journalTodo.title||vm.removeTodo(journalTodo)},vm.openJournalTodo=function(journalTodo){var modalInstance=$uibModal.open({animation:!0,templateUrl:"journal-todo-modal.html",controller:"JournalTodoCtrl as journalTodoCtrl",backdrop:"static",size:"xl",resolve:{journalTodoData:function(){return journalTodo}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.journalTodosManager.getJournalTodos(vm.journalId)};journalTodosCtrl.$inject=["JournalTodosManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log"],angular.module("app.journal").controller("JournalTodosCtrl",journalTodosCtrl);