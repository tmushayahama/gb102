var adviceTodosCtrl = function (
        AdviceTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.adviceId = $stateParams.adviceId;
 vm.adviceTodosManager = new AdviceTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultAdviceTodoData = {
  adviceId: $stateParams.adviceId,
  privacy: 0
 };
 vm.newAdviceTodoData = angular.copy(vm.defaultAdviceTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createAdviceTodo = function (data) {
  vm.adviceTodosManager.createAdviceTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newAdviceTodoData = angular.copy(vm.defaultAdviceTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceTodo = function (data) {
  vm.adviceTodosManager.editAdviceTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newAdviceTodoData = angular.copy(vm.defaultAdviceTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceTodoSections = {
  title: function (adviceTodoId, title) {
   var adviceTodoData = {
    adviceTodoId: adviceTodoId,
    title: title
   };
   vm.editAdviceTodo(adviceTodoData);
  }
 }

 vm.cancelAdviceTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newAdviceTodoData = angular.copy(vm.defaultAdviceTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.adviceTodos;
 }), function () {
  //vm.remainingCount = filterFilter(adviceTodos, {completed: false}).length;
  vm.doneCount = vm.adviceTodosManager.adviceTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //AdviceTodoService.put(vm.adviceTodos);
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




 vm.editTodo = function (adviceTodo) {
  vm.editedTodo = adviceTodo;
  // Clone the original adviceTodo to restore it on demand.
  vm.originalTodo = angular.copy(adviceTodo);
 };


 vm.doneEditing = function (adviceTodo) {
  vm.editedTodo = null;
  adviceTodo.title = adviceTodo.title.trim();

  if (!adviceTodo.title) {
   vm.removeTodo(adviceTodo);
  }
 };

 vm.openAdviceTodo = function (adviceTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'advice-todo-modal.html',
   controller: 'AdviceTodoCtrl as adviceTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    adviceTodoData: function () {
     return adviceTodo;
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
 vm.adviceTodosManager.getAdviceTodos(vm.adviceId);
};

adviceTodosCtrl.$inject = [
 'AdviceTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.advices").controller('AdviceTodosCtrl', adviceTodosCtrl);
