var groupTodosCtrl = function (
        GroupTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.groupId = $stateParams.groupId;
 vm.groupTodosManager = new GroupTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultGroupTodoData = {
  groupId: $stateParams.groupId,
  privacy: 0
 };
 vm.newGroupTodoData = angular.copy(vm.defaultGroupTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createGroupTodo = function (data) {
  vm.groupTodosManager.createGroupTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newGroupTodoData = angular.copy(vm.defaultGroupTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupTodo = function (data) {
  vm.groupTodosManager.editGroupTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newGroupTodoData = angular.copy(vm.defaultGroupTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupTodoSections = {
  title: function (groupTodoId, title) {
   var groupTodoData = {
    groupTodoId: groupTodoId,
    title: title
   };
   vm.editGroupTodo(groupTodoData);
  }
 }

 vm.cancelGroupTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newGroupTodoData = angular.copy(vm.defaultGroupTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.groupTodos;
 }), function () {
  //vm.remainingCount = filterFilter(groupTodos, {completed: false}).length;
  vm.doneCount = vm.groupTodosManager.groupTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GroupTodoService.put(vm.groupTodos);
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




 vm.editTodo = function (groupTodo) {
  vm.editedTodo = groupTodo;
  // Clone the original groupTodo to restore it on demand.
  vm.originalTodo = angular.copy(groupTodo);
 };


 vm.doneEditing = function (groupTodo) {
  vm.editedTodo = null;
  groupTodo.title = groupTodo.title.trim();

  if (!groupTodo.title) {
   vm.removeTodo(groupTodo);
  }
 };

 vm.openGroupTodo = function (groupTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'group-todo-modal.html',
   controller: 'GroupTodoCtrl as groupTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    groupTodoData: function () {
     return groupTodo;
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
 vm.groupTodosManager.getGroupTodos(vm.groupId);
};

groupTodosCtrl.$inject = [
 'GroupTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.groups").controller('GroupTodosCtrl', groupTodosCtrl);
