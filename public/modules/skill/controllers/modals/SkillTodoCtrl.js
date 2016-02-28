var skillTodoCtrl = function (
        SkillTodoSrv,
        SkillTodoChecklistSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        skillTodoData) {
 var vm = this;
 vm.skillId = skillTodoData.skill_id;
 vm.skillTodoId = skillTodoData.id;
 vm.skillTodoSrv = new SkillTodoSrv();
 vm.skillTodoChecklistSrv = new SkillTodoChecklistSrv();


 vm.todoId = skillTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newSkillTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSkillTodoData = vm.defaultSkillTodoData;

 vm.getSkillTodo = function (skillId, todoId) {
  vm.skillTodoSrv.getSkillTodo(skillId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSkillTodo = function (data) {
  vm.skillTodoSrv.editSkillTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillTodoSections = {
  details: function (details) {
   var skillTodoData = {
    skillTodoId: vm.skillTodoId,
    title: details.title,
    description: details.description
   };
   vm.editSkillTodo(skillTodoData);
  }
 }

 vm.getSkillTodoChecklist = function (todoId) {
  vm.skillTodoChecklistSrv.getSkillTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createSkillTodoChecklistItem = function (data) {
  vm.skillTodoChecklistSrv.createSkillTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newSkillTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillTodoChecklistItem = function (data) {
  vm.skillTodoChecklistSrv.editSkillTodoChecklistItem(data).then(function (response) {
   vm.newSkillTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var skillTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editSkillTodoChecklistItem(skillTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newSkillTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.skillTodoChecklistSrv.skillTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.skillTodoChecklistSrv.skillTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getSkillTodo(vm.skillId, vm.todoId);
 vm.getSkillTodoChecklist(vm.todoId);
};

skillTodoCtrl.$inject = [
 'SkillTodoSrv',
 'SkillTodoChecklistSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'skillTodoData', ];

angular.module("app.skills").controller('SkillTodoCtrl', skillTodoCtrl);
