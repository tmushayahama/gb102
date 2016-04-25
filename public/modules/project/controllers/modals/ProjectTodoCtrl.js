var projectTodoCtrl = function (
        ProjectTodosSrv,
        ProjectTodoChecklistSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        projectTodoData) {
 var vm = this;
 vm.projectId = projectTodoData.project_id;
 vm.projectTodoId = projectTodoData.id;
 vm.projectTodosSrv = new ProjectTodosSrv();
 vm.projectTodoChecklistSrv = new ProjectTodoChecklistSrv();


 vm.todoId = projectTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newProjectTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProjectTodoData = vm.defaultProjectTodoData;

 vm.getProjectTodo = function (projectId, todoId) {
  vm.projectTodosSrv.getProjectTodo(projectId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProjectTodo = function (data) {
  vm.projectTodosSrv.editProjectTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectTodoSections = {
  details: function (details) {
   var projectTodoData = {
    projectTodoId: vm.projectTodoId,
    title: details.title,
    description: details.description
   };
   vm.editProjectTodo(projectTodoData);
  }
 }

 vm.getProjectTodoChecklist = function (todoId) {
  vm.projectTodoChecklistSrv.getProjectTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createProjectTodoChecklistItem = function (data) {
  vm.projectTodoChecklistSrv.createProjectTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newProjectTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectTodoChecklistItem = function (data) {
  vm.projectTodoChecklistSrv.editProjectTodoChecklistItem(data).then(function (response) {
   vm.newProjectTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var projectTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editProjectTodoChecklistItem(projectTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newProjectTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.projectTodoChecklistSrv.projectTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.projectTodoChecklistSrv.projectTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getProjectTodo(vm.projectId, vm.todoId);
 vm.getProjectTodoChecklist(vm.todoId);
};

projectTodoCtrl.$inject = [
 'ProjectTodosSrv',
 'ProjectTodoChecklistSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'projectTodoData', ];

angular.module("app.project").controller('ProjectTodoCtrl', projectTodoCtrl);
