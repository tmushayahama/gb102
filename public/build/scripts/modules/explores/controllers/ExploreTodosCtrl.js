var exploreTodosCtrl=function(ExploreTodosManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log){var vm=this;vm.exploreId=$stateParams.exploreId,vm.exploreTodosManager=new ExploreTodosManager,vm.todoFormDisplay=!1,vm.defaultExploreTodoData={exploreId:$stateParams.exploreId,privacy:0},vm.newExploreTodoData=angular.copy(vm.defaultExploreTodoData),vm.showTodoForm=function(){vm.todoFormDisplay=!0},vm.createExploreTodo=function(data){vm.exploreTodosManager.createExploreTodo(data).then(function(response){vm.todoFormDisplay=!1,vm.newExploreTodoData=angular.copy(vm.defaultExploreTodoData)},function(response){console.log(response)})},vm.editExploreTodo=function(data){vm.exploreTodosManager.editExploreTodo(data).then(function(response){vm.todoFormDisplay=!1,vm.newExploreTodoData=angular.copy(vm.defaultExploreTodoData)},function(response){console.log(response)})},vm.editExploreTodoSections={title:function(exploreTodoId,title){var exploreTodoData={exploreTodoId:exploreTodoId,title:title};vm.editExploreTodo(exploreTodoData)}},vm.cancelExploreTodo=function(form){vm.todoFormDisplay=!1,vm.newExploreTodoData=angular.copy(vm.defaultExploreTodoData),form&&(form.$setPristine(),form.$setUntouched())},vm.editedTodo=null,$scope.$watch(angular.bind(this,function(){return vm.exploreTodos}),function(){vm.doneCount=vm.exploreTodosManager.exploreTodos.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTodo=function(exploreTodo){vm.editedTodo=exploreTodo,vm.originalTodo=angular.copy(exploreTodo)},vm.doneEditing=function(exploreTodo){vm.editedTodo=null,exploreTodo.title=exploreTodo.title.trim(),exploreTodo.title||vm.removeTodo(exploreTodo)},vm.openExploreTodo=function(exploreTodo){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explore-todo-modal.html",controller:"ExploreTodoCtrl as exploreTodoCtrl",backdrop:"static",size:"xl",resolve:{exploreTodoData:function(){return exploreTodo}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.exploreTodosManager.getExploreTodos(vm.exploreId)};exploreTodosCtrl.$inject=["ExploreTodosManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log"],angular.module("app.explores").controller("ExploreTodosCtrl",exploreTodosCtrl);