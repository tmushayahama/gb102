var explorerTodosCtrl = function (
        level_categories,
        ExplorerTodosSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.explorerId = $stateParams.explorerId;
 vm.explorerTodos = {};
 vm.explorerTodosSrv = new ExplorerTodosSrv();
 vm.todoFormDisplay = false;

 vm.getExplorerTodoPercentage = function (explorerTodoId) {
  return 100;
 };

 vm.todoChecklistCount = function (todoId) {
  vm.explorerTodosSrv.todoChecklistCount(todoId)
          .then(function (data) {
           return data;
          });
 };

 vm.showTodoForm = function (todoId) {
  vm.explorerTodosSrv.todoChecklistCount(vm.explorerId, level_categories.todo_level_normal)
          .then(function (data) {
           vm.explorerTodos = data;
          });
 };

 vm.defaultExplorerTodoData = {
  explorerId: $stateParams.explorerId,
  title: '',
  description: '',
  privacy: 0
 };
 vm.newExplorerTodoData = angular.copy(vm.defaultExplorerTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createExplorerTodo = function (data) {
  data.level_id = level_categories.todo_level_normal;
  data.status_id = level_categories.todo_status_in_progress;
  vm.explorerTodosSrv.createExplorerTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newExplorerTodoData = angular.copy(vm.defaultExplorerTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerTodo = function (data) {
  vm.explorerTodosSrv.editExplorerTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newExplorerTodoData = angular.copy(vm.defaultExplorerTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerTodoSections = {
  title: function (explorerTodoId, title) {
   var explorerTodoData = {
    explorerTodoId: explorerTodoId,
    title: title
   };
   vm.editExplorerTodo(explorerTodoData);
  }
 }

 vm.cancelExplorerTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newExplorerTodoData = angular.copy(vm.defaultExplorerTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerTodos;
 }), function () {
  //vm.remainingCount = filterFilter(explorerTodos, {completed: false}).length;
  vm.doneCount = vm.explorerTodosSrv.explorerTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerTodoService.put(vm.explorerTodos);
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




 vm.editTodo = function (explorerTodo) {
  vm.editedTodo = explorerTodo;
  // Clone the original explorerTodo to restore it on demand.
  vm.originalTodo = angular.copy(explorerTodo);
 };


 vm.doneEditing = function (explorerTodo) {
  vm.editedTodo = null;
  explorerTodo.title = explorerTodo.title.trim();

  if (!explorerTodo.title) {
   vm.removeTodo(explorerTodo);
  }
 };

 vm.openExplorerTodo = function (explorerTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-todo-modal.html',
   controller: 'ExplorerTodoCtrl as explorerTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerTodoData: function () {
     return explorerTodo;
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
 vm.explorerTodosSrv.getExplorerTodos(vm.explorerId, level_categories.todo_in_progress)
         .then(function (data) {
          vm.explorerTodos.inProgress = data;
         });

 vm.explorerTodosSrv.getExplorerTodos(vm.explorerId, level_categories.todo_done)
         .then(function (data) {
          vm.explorerTodos.done = data;
         });

 vm.explorerTodosSrv.getExplorerTodos(vm.explorerId, level_categories.todo_later)
         .then(function (data) {
          vm.explorerTodos.later = data;
         });
};

explorerTodosCtrl.$inject = [
 'level_categories',
 'ExplorerTodosSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.explorer").controller('ExplorerTodosCtrl', explorerTodosCtrl);
