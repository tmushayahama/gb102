var profileTodosCtrl = function (
        ProfileTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.profileId = $stateParams.profileId;
 vm.profileTodosManager = new ProfileTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultProfileTodoData = {
  profileId: $stateParams.profileId,
  privacy: 0
 };
 vm.newProfileTodoData = angular.copy(vm.defaultProfileTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createProfileTodo = function (data) {
  vm.profileTodosManager.createProfileTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newProfileTodoData = angular.copy(vm.defaultProfileTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileTodo = function (data) {
  vm.profileTodosManager.editProfileTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newProfileTodoData = angular.copy(vm.defaultProfileTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileTodoSections = {
  title: function (profileTodoId, title) {
   var profileTodoData = {
    profileTodoId: profileTodoId,
    title: title
   };
   vm.editProfileTodo(profileTodoData);
  }
 }

 vm.cancelProfileTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newProfileTodoData = angular.copy(vm.defaultProfileTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.profileTodos;
 }), function () {
  //vm.remainingCount = filterFilter(profileTodos, {completed: false}).length;
  vm.doneCount = vm.profileTodosManager.profileTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProfileTodoService.put(vm.profileTodos);
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




 vm.editTodo = function (profileTodo) {
  vm.editedTodo = profileTodo;
  // Clone the original profileTodo to restore it on demand.
  vm.originalTodo = angular.copy(profileTodo);
 };


 vm.doneEditing = function (profileTodo) {
  vm.editedTodo = null;
  profileTodo.title = profileTodo.title.trim();

  if (!profileTodo.title) {
   vm.removeTodo(profileTodo);
  }
 };

 vm.openProfileTodo = function (profileTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'profile-todo-modal.html',
   controller: 'ProfileTodoCtrl as profileTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    profileTodoData: function () {
     return profileTodo;
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
 vm.profileTodosManager.getProfileTodos(vm.profileId);
};

profileTodosCtrl.$inject = [
 'ProfileTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.profiles").controller('ProfileTodosCtrl', profileTodosCtrl);
