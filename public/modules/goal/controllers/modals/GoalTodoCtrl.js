var goalTodoCtrl = function (
        GoalTodoSrv,
        GoalTodoChecklistSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        goalTodoData) {
 var vm = this;
 vm.goalId = goalTodoData.goal_id;
 vm.goalTodoId = goalTodoData.id;
 vm.goalTodoSrv = new GoalTodoSrv();
 vm.goalTodoChecklistSrv = new GoalTodoChecklistSrv();


 vm.todoId = goalTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newGoalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGoalTodoData = vm.defaultGoalTodoData;

 vm.getGoalTodo = function (goalId, todoId) {
  vm.goalTodoSrv.getGoalTodo(goalId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGoalTodo = function (data) {
  vm.goalTodoSrv.editGoalTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalTodoSections = {
  details: function (details) {
   var goalTodoData = {
    goalTodoId: vm.goalTodoId,
    title: details.title,
    description: details.description
   };
   vm.editGoalTodo(goalTodoData);
  }
 }

 vm.getGoalTodoChecklist = function (todoId) {
  vm.goalTodoChecklistSrv.getGoalTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createGoalTodoChecklistItem = function (data) {
  vm.goalTodoChecklistSrv.createGoalTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newGoalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalTodoChecklistItem = function (data) {
  vm.goalTodoChecklistSrv.editGoalTodoChecklistItem(data).then(function (response) {
   vm.newGoalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var goalTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editGoalTodoChecklistItem(goalTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newGoalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.goalTodoChecklistSrv.goalTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.goalTodoChecklistSrv.goalTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getGoalTodo(vm.goalId, vm.todoId);
 vm.getGoalTodoChecklist(vm.todoId);
};

goalTodoCtrl.$inject = [
 'GoalTodoSrv',
 'GoalTodoChecklistSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'goalTodoData', ];

angular.module("app.goal").controller('GoalTodoCtrl', goalTodoCtrl);
