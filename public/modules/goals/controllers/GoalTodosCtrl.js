var goalTodosCtrl = function (
        GoalTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.goalId = $stateParams.goalId;
 vm.goalTodosManager = new GoalTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultGoalTodoData = {
  goalId: $stateParams.goalId,
  privacy: 0
 };
 vm.newGoalTodoData = angular.copy(vm.defaultGoalTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createGoalTodo = function (data) {
  vm.goalTodosManager.createGoalTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newGoalTodoData = angular.copy(vm.defaultGoalTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalTodo = function (data) {
  vm.goalTodosManager.editGoalTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newGoalTodoData = angular.copy(vm.defaultGoalTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalTodoSections = {
  title: function (goalTodoId, title) {
   var goalTodoData = {
    goalTodoId: goalTodoId,
    title: title
   };
   vm.editGoalTodo(goalTodoData);
  }
 }

 vm.cancelGoalTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newGoalTodoData = angular.copy(vm.defaultGoalTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.goalTodos;
 }), function () {
  //vm.remainingCount = filterFilter(goalTodos, {completed: false}).length;
  vm.doneCount = vm.goalTodosManager.goalTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GoalTodoService.put(vm.goalTodos);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.editTodo = function (goalTodo) {
  vm.editedTodo = goalTodo;
  // Clone the original goalTodo to restore it on demand.
  vm.originalTodo = angular.copy(goalTodo);
 };


 vm.doneEditing = function (goalTodo) {
  vm.editedTodo = null;
  goalTodo.title = goalTodo.title.trim();

  if (!goalTodo.title) {
   vm.removeTodo(goalTodo);
  }
 };

 vm.openGoalTodo = function (goalTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'goal-todo-modal.html',
   controller: 'GoalTodoCtrl as goalTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    goalTodoData: function () {
     return goalTodo;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.goalTodosManager.getGoalTodos(vm.goalId);
};

goalTodosCtrl.$inject = [
 'GoalTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.goals").controller('GoalTodosCtrl', goalTodosCtrl);
