var skillTodosCtrl=function(SkillTodosSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log){var vm=this;vm.skillId=$stateParams.skillId,vm.skillTodosSrv=new SkillTodosSrv,vm.todoFormDisplay=!1,vm.defaultSkillTodoData={skillId:$stateParams.skillId,privacy:0},vm.newSkillTodoData=angular.copy(vm.defaultSkillTodoData),vm.showTodoForm=function(){vm.todoFormDisplay=!0},vm.createSkillTodo=function(data){vm.skillTodosSrv.createSkillTodo(data).then(function(response){vm.todoFormDisplay=!1,vm.newSkillTodoData=angular.copy(vm.defaultSkillTodoData)},function(response){console.log(response)})},vm.editSkillTodo=function(data){vm.skillTodosSrv.editSkillTodo(data).then(function(response){vm.todoFormDisplay=!1,vm.newSkillTodoData=angular.copy(vm.defaultSkillTodoData)},function(response){console.log(response)})},vm.editSkillTodoSections={title:function(skillTodoId,title){var skillTodoData={skillTodoId:skillTodoId,title:title};vm.editSkillTodo(skillTodoData)}},vm.cancelSkillTodo=function(form){vm.todoFormDisplay=!1,vm.newSkillTodoData=angular.copy(vm.defaultSkillTodoData),form&&(form.$setPristine(),form.$setUntouched())},vm.editedTodo=null,$scope.$watch(angular.bind(this,function(){return vm.skillTodos}),function(){vm.doneCount=vm.skillTodosSrv.skillTodos.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTodo=function(skillTodo){vm.editedTodo=skillTodo,vm.originalTodo=angular.copy(skillTodo)},vm.doneEditing=function(skillTodo){vm.editedTodo=null,skillTodo.title=skillTodo.title.trim(),skillTodo.title||vm.removeTodo(skillTodo)},vm.openSkillTodo=function(skillTodo){var modalInstance=$uibModal.open({animation:!0,templateUrl:"skill-todo-modal.html",controller:"SkillTodoCtrl as skillTodoCtrl",backdrop:"static",size:"xl",resolve:{skillTodoData:function(){return skillTodo}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.skillTodosSrv.getSkillTodos(vm.skillId)};skillTodosCtrl.$inject=["SkillTodosSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log"],angular.module("app.skills").controller("SkillTodosCtrl",skillTodosCtrl);