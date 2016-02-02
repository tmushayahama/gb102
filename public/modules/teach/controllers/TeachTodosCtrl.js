var teachTodosCtrl = function (
        TeachTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.teachId = $stateParams.teachId;
 vm.teachTodosManager = new TeachTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultTeachTodoData = {
  teachId: $stateParams.teachId,
  privacy: 0
 };
 vm.newTeachTodoData = angular.copy(vm.defaultTeachTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createTeachTodo = function (data) {
  vm.teachTodosManager.createTeachTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newTeachTodoData = angular.copy(vm.defaultTeachTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachTodo = function (data) {
  vm.teachTodosManager.editTeachTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newTeachTodoData = angular.copy(vm.defaultTeachTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachTodoSections = {
  title: function (teachTodoId, title) {
   var teachTodoData = {
    teachTodoId: teachTodoId,
    title: title
   };
   vm.editTeachTodo(teachTodoData);
  }
 }

 vm.cancelTeachTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newTeachTodoData = angular.copy(vm.defaultTeachTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.teachTodos;
 }), function () {
  //vm.remainingCount = filterFilter(teachTodos, {completed: false}).length;
  vm.doneCount = vm.teachTodosManager.teachTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TeachTodoService.put(vm.teachTodos);
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




 vm.editTodo = function (teachTodo) {
  vm.editedTodo = teachTodo;
  // Clone the original teachTodo to restore it on demand.
  vm.originalTodo = angular.copy(teachTodo);
 };


 vm.doneEditing = function (teachTodo) {
  vm.editedTodo = null;
  teachTodo.title = teachTodo.title.trim();

  if (!teachTodo.title) {
   vm.removeTodo(teachTodo);
  }
 };

 vm.openTeachTodo = function (teachTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'teach-todo-modal.html',
   controller: 'TeachTodoCtrl as teachTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    teachTodoData: function () {
     return teachTodo;
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
 vm.teachTodosManager.getTeachTodos(vm.teachId);
};

teachTodosCtrl.$inject = [
 'TeachTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.teach").controller('TeachTodosCtrl', teachTodosCtrl);
