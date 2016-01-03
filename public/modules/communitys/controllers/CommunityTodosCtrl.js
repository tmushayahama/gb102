var communityTodosCtrl = function (
        CommunityTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.communityId = $stateParams.communityId;
 vm.communityTodosManager = new CommunityTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultCommunityTodoData = {
  communityId: $stateParams.communityId,
  privacy: 0
 };
 vm.newCommunityTodoData = angular.copy(vm.defaultCommunityTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createCommunityTodo = function (data) {
  vm.communityTodosManager.createCommunityTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newCommunityTodoData = angular.copy(vm.defaultCommunityTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityTodo = function (data) {
  vm.communityTodosManager.editCommunityTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newCommunityTodoData = angular.copy(vm.defaultCommunityTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityTodoSections = {
  title: function (communityTodoId, title) {
   var communityTodoData = {
    communityTodoId: communityTodoId,
    title: title
   };
   vm.editCommunityTodo(communityTodoData);
  }
 }

 vm.cancelCommunityTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newCommunityTodoData = angular.copy(vm.defaultCommunityTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.communityTodos;
 }), function () {
  //vm.remainingCount = filterFilter(communityTodos, {completed: false}).length;
  vm.doneCount = vm.communityTodosManager.communityTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CommunityTodoService.put(vm.communityTodos);
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




 vm.editTodo = function (communityTodo) {
  vm.editedTodo = communityTodo;
  // Clone the original communityTodo to restore it on demand.
  vm.originalTodo = angular.copy(communityTodo);
 };


 vm.doneEditing = function (communityTodo) {
  vm.editedTodo = null;
  communityTodo.title = communityTodo.title.trim();

  if (!communityTodo.title) {
   vm.removeTodo(communityTodo);
  }
 };

 vm.openCommunityTodo = function (communityTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'community-todo-modal.html',
   controller: 'CommunityTodoCtrl as communityTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    communityTodoData: function () {
     return communityTodo;
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
 vm.communityTodosManager.getCommunityTodos(vm.communityId);
};

communityTodosCtrl.$inject = [
 'CommunityTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.communitys").controller('CommunityTodosCtrl', communityTodosCtrl);
