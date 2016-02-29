var explorerTodoCtrl = function (
        ExplorerTodoSrv,
        ExplorerTodoChecklistSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerTodoData) {
 var vm = this;
 vm.explorerId = explorerTodoData.explorer_id;
 vm.explorerTodoId = explorerTodoData.id;
 vm.explorerTodoSrv = new ExplorerTodoSrv();
 vm.explorerTodoChecklistSrv = new ExplorerTodoChecklistSrv();


 vm.todoId = explorerTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newExplorerTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerTodoData = vm.defaultExplorerTodoData;

 vm.getExplorerTodo = function (explorerId, todoId) {
  vm.explorerTodoSrv.getExplorerTodo(explorerId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerTodo = function (data) {
  vm.explorerTodoSrv.editExplorerTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerTodoSections = {
  details: function (details) {
   var explorerTodoData = {
    explorerTodoId: vm.explorerTodoId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerTodo(explorerTodoData);
  }
 }

 vm.getExplorerTodoChecklist = function (todoId) {
  vm.explorerTodoChecklistSrv.getExplorerTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createExplorerTodoChecklistItem = function (data) {
  vm.explorerTodoChecklistSrv.createExplorerTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newExplorerTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerTodoChecklistItem = function (data) {
  vm.explorerTodoChecklistSrv.editExplorerTodoChecklistItem(data).then(function (response) {
   vm.newExplorerTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var explorerTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editExplorerTodoChecklistItem(explorerTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newExplorerTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerTodoChecklistSrv.explorerTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.explorerTodoChecklistSrv.explorerTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getExplorerTodo(vm.explorerId, vm.todoId);
 vm.getExplorerTodoChecklist(vm.todoId);
};

explorerTodoCtrl.$inject = [
 'ExplorerTodoSrv',
 'ExplorerTodoChecklistSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerTodoData', ];

angular.module("app.explorer").controller('ExplorerTodoCtrl', explorerTodoCtrl);