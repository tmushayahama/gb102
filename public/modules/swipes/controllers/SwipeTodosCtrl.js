var swipeTodosCtrl = function (
        SwipeTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.swipeId = $stateParams.swipeId;
 vm.swipeTodosManager = new SwipeTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultSwipeTodoData = {
  swipeId: $stateParams.swipeId,
  privacy: 0
 };
 vm.newSwipeTodoData = angular.copy(vm.defaultSwipeTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createSwipeTodo = function (data) {
  vm.swipeTodosManager.createSwipeTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newSwipeTodoData = angular.copy(vm.defaultSwipeTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeTodo = function (data) {
  vm.swipeTodosManager.editSwipeTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newSwipeTodoData = angular.copy(vm.defaultSwipeTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeTodoSections = {
  title: function (swipeTodoId, title) {
   var swipeTodoData = {
    swipeTodoId: swipeTodoId,
    title: title
   };
   vm.editSwipeTodo(swipeTodoData);
  }
 }

 vm.cancelSwipeTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newSwipeTodoData = angular.copy(vm.defaultSwipeTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.swipeTodos;
 }), function () {
  //vm.remainingCount = filterFilter(swipeTodos, {completed: false}).length;
  vm.doneCount = vm.swipeTodosManager.swipeTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SwipeTodoService.put(vm.swipeTodos);
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




 vm.editTodo = function (swipeTodo) {
  vm.editedTodo = swipeTodo;
  // Clone the original swipeTodo to restore it on demand.
  vm.originalTodo = angular.copy(swipeTodo);
 };


 vm.doneEditing = function (swipeTodo) {
  vm.editedTodo = null;
  swipeTodo.title = swipeTodo.title.trim();

  if (!swipeTodo.title) {
   vm.removeTodo(swipeTodo);
  }
 };

 vm.openSwipeTodo = function (swipeTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'swipe-todo-modal.html',
   controller: 'SwipeTodoCtrl as swipeTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    swipeTodoData: function () {
     return swipeTodo;
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
 vm.swipeTodosManager.getSwipeTodos(vm.swipeId);
};

swipeTodosCtrl.$inject = [
 'SwipeTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.swipes").controller('SwipeTodosCtrl', swipeTodosCtrl);
