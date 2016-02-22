var exploreProgressCtrl = function (
        level_categories,
        ExploreTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.exploreId = $stateParams.exploreId;
 vm.exploreTodos;
 vm.exploreTodosManager = new ExploreTodosManager();
 vm.todoFormDisplay = false;

 vm.getExploreTodoPercentage = function (exploreTodoId) {
  return 100;
 }

 vm.defaultExploreTodoData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 };
 vm.newExploreTodoData = angular.copy(vm.defaultExploreTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createExploreTodo = function (data) {
  vm.exploreTodosManager.createExploreTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newExploreTodoData = angular.copy(vm.defaultExploreTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreTodo = function (data) {
  vm.exploreTodosManager.editExploreTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newExploreTodoData = angular.copy(vm.defaultExploreTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreTodoSections = {
  title: function (exploreTodoId, title) {
   var exploreTodoData = {
    exploreTodoId: exploreTodoId,
    title: title
   };
   vm.editExploreTodo(exploreTodoData);
  }
 }

 vm.cancelExploreTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newExploreTodoData = angular.copy(vm.defaultExploreTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.exploreTodos;
 }), function () {
  //vm.remainingCount = filterFilter(exploreTodos, {completed: false}).length;
  vm.doneCount = vm.exploreTodosManager.exploreTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreTodoService.put(vm.exploreTodos);
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




 vm.editTodo = function (exploreTodo) {
  vm.editedTodo = exploreTodo;
  // Clone the original exploreTodo to restore it on demand.
  vm.originalTodo = angular.copy(exploreTodo);
 };


 vm.doneEditing = function (exploreTodo) {
  vm.editedTodo = null;
  exploreTodo.title = exploreTodo.title.trim();

  if (!exploreTodo.title) {
   vm.removeTodo(exploreTodo);
  }
 };

 vm.openExploreTodo = function (exploreTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explore-todo-modal.html',
   controller: 'ExploreTodoCtrl as exploreTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    exploreTodoData: function () {
     return exploreTodo;
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
 vm.exploreTodosManager.getExploreTodos(vm.exploreId, level_categories.todo_level_progress)
         .then(function (data) {
          vm.exploreTodos = data;
         });
};

exploreProgressCtrl.$inject = [
 'level_categories',
 'ExploreTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.explore").controller('ExploreProgressCtrl', exploreProgressCtrl);
