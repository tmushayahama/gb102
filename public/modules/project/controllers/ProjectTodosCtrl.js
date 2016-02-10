var projectTodosCtrl = function (
        ProjectTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.projectId = $stateParams.projectId;
 vm.projectTodosManager = new ProjectTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultProjectTodoData = {
  projectId: $stateParams.projectId,
  privacy: 0
 };
 vm.newProjectTodoData = angular.copy(vm.defaultProjectTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createProjectTodo = function (data) {
  vm.projectTodosManager.createProjectTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newProjectTodoData = angular.copy(vm.defaultProjectTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectTodo = function (data) {
  vm.projectTodosManager.editProjectTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newProjectTodoData = angular.copy(vm.defaultProjectTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectTodoSections = {
  title: function (projectTodoId, title) {
   var projectTodoData = {
    projectTodoId: projectTodoId,
    title: title
   };
   vm.editProjectTodo(projectTodoData);
  }
 }

 vm.cancelProjectTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newProjectTodoData = angular.copy(vm.defaultProjectTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.projectTodos;
 }), function () {
  //vm.remainingCount = filterFilter(projectTodos, {completed: false}).length;
  vm.doneCount = vm.projectTodosManager.projectTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProjectTodoService.put(vm.projectTodos);
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




 vm.editTodo = function (projectTodo) {
  vm.editedTodo = projectTodo;
  // Clone the original projectTodo to restore it on demand.
  vm.originalTodo = angular.copy(projectTodo);
 };


 vm.doneEditing = function (projectTodo) {
  vm.editedTodo = null;
  projectTodo.title = projectTodo.title.trim();

  if (!projectTodo.title) {
   vm.removeTodo(projectTodo);
  }
 };

 vm.openProjectTodo = function (projectTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'project-todo-modal.html',
   controller: 'ProjectTodoCtrl as projectTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    projectTodoData: function () {
     return projectTodo;
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
 vm.projectTodosManager.getProjectTodos(vm.projectId);
};

projectTodosCtrl.$inject = [
 'ProjectTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.project").controller('ProjectTodosCtrl', projectTodosCtrl);
