var promiseTodosCtrl = function (
        PromiseTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.promiseId = $stateParams.promiseId;
 vm.promiseTodosManager = new PromiseTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultPromiseTodoData = {
  promiseId: $stateParams.promiseId,
  privacy: 0
 };
 vm.newPromiseTodoData = angular.copy(vm.defaultPromiseTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createPromiseTodo = function (data) {
  vm.promiseTodosManager.createPromiseTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newPromiseTodoData = angular.copy(vm.defaultPromiseTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editPromiseTodo = function (data) {
  vm.promiseTodosManager.editPromiseTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newPromiseTodoData = angular.copy(vm.defaultPromiseTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editPromiseTodoSections = {
  title: function (promiseTodoId, title) {
   var promiseTodoData = {
    promiseTodoId: promiseTodoId,
    title: title
   };
   vm.editPromiseTodo(promiseTodoData);
  }
 }

 vm.cancelPromiseTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newPromiseTodoData = angular.copy(vm.defaultPromiseTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.promiseTodos;
 }), function () {
  //vm.remainingCount = filterFilter(promiseTodos, {completed: false}).length;
  vm.doneCount = vm.promiseTodosManager.promiseTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //PromiseTodoService.put(vm.promiseTodos);
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




 vm.editTodo = function (promiseTodo) {
  vm.editedTodo = promiseTodo;
  // Clone the original promiseTodo to restore it on demand.
  vm.originalTodo = angular.copy(promiseTodo);
 };


 vm.doneEditing = function (promiseTodo) {
  vm.editedTodo = null;
  promiseTodo.title = promiseTodo.title.trim();

  if (!promiseTodo.title) {
   vm.removeTodo(promiseTodo);
  }
 };

 vm.openPromiseTodo = function (promiseTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'promise-todo-modal.html',
   controller: 'PromiseTodoCtrl as promiseTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    promiseTodoData: function () {
     return promiseTodo;
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
 vm.promiseTodosManager.getPromiseTodos(vm.promiseId);
};

promiseTodosCtrl.$inject = [
 'PromiseTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.promises").controller('PromiseTodosCtrl', promiseTodosCtrl);
