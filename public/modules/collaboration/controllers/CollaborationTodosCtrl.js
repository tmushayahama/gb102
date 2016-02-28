var collaborationTodosCtrl = function (
        CollaborationTodosSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.collaborationId = $stateParams.collaborationId;
 vm.collaborationTodosSrv = new CollaborationTodosSrv();
 vm.todoFormDisplay = false;

 vm.defaultCollaborationTodoData = {
  collaborationId: $stateParams.collaborationId,
  privacy: 0
 };
 vm.newCollaborationTodoData = angular.copy(vm.defaultCollaborationTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createCollaborationTodo = function (data) {
  vm.collaborationTodosSrv.createCollaborationTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newCollaborationTodoData = angular.copy(vm.defaultCollaborationTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationTodo = function (data) {
  vm.collaborationTodosSrv.editCollaborationTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newCollaborationTodoData = angular.copy(vm.defaultCollaborationTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationTodoSections = {
  title: function (collaborationTodoId, title) {
   var collaborationTodoData = {
    collaborationTodoId: collaborationTodoId,
    title: title
   };
   vm.editCollaborationTodo(collaborationTodoData);
  }
 }

 vm.cancelCollaborationTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newCollaborationTodoData = angular.copy(vm.defaultCollaborationTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.collaborationTodos;
 }), function () {
  //vm.remainingCount = filterFilter(collaborationTodos, {completed: false}).length;
  vm.doneCount = vm.collaborationTodosSrv.collaborationTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CollaborationTodoService.put(vm.collaborationTodos);
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




 vm.editTodo = function (collaborationTodo) {
  vm.editedTodo = collaborationTodo;
  // Clone the original collaborationTodo to restore it on demand.
  vm.originalTodo = angular.copy(collaborationTodo);
 };


 vm.doneEditing = function (collaborationTodo) {
  vm.editedTodo = null;
  collaborationTodo.title = collaborationTodo.title.trim();

  if (!collaborationTodo.title) {
   vm.removeTodo(collaborationTodo);
  }
 };

 vm.openCollaborationTodo = function (collaborationTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'collaboration-todo-modal.html',
   controller: 'CollaborationTodoCtrl as collaborationTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    collaborationTodoData: function () {
     return collaborationTodo;
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
 vm.collaborationTodosSrv.getCollaborationTodos(vm.collaborationId);
};

collaborationTodosCtrl.$inject = [
 'CollaborationTodosSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.collaboration").controller('CollaborationTodosCtrl', collaborationTodosCtrl);
