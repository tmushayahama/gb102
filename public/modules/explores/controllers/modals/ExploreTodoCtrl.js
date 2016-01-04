var exploreTodoCtrl = function (
        ExploreTodoManager,
        ExploreTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreTodoData) {
 var vm = this;
 vm.exploreId = exploreTodoData.explore_id;
 vm.exploreTodoId = exploreTodoData.id;
 vm.exploreTodoManager = new ExploreTodoManager();
 vm.exploreTodoChecklistManager = new ExploreTodoChecklistManager();


 vm.todoId = exploreTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newExploreTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExploreTodoData = vm.defaultExploreTodoData;

 vm.getExploreTodo = function (exploreId, todoId) {
  vm.exploreTodoManager.getExploreTodo(exploreId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExploreTodo = function (data) {
  vm.exploreTodoManager.editExploreTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreTodoSections = {
  details: function (details) {
   var exploreTodoData = {
    exploreTodoId: vm.exploreTodoId,
    title: details.title,
    description: details.description
   };
   vm.editExploreTodo(exploreTodoData);
  }
 }

 vm.getExploreTodoChecklist = function (todoId) {
  vm.exploreTodoChecklistManager.getExploreTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createExploreTodoChecklistItem = function (data) {
  vm.exploreTodoChecklistManager.createExploreTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newExploreTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreTodoChecklistItem = function (data) {
  vm.exploreTodoChecklistManager.editExploreTodoChecklistItem(data).then(function (response) {
   vm.newExploreTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var exploreTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editExploreTodoChecklistItem(exploreTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newExploreTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.exploreTodoChecklistManager.exploreTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.exploreTodoChecklistManager.exploreTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getExploreTodo(vm.exploreId, vm.todoId);
 vm.getExploreTodoChecklist(vm.todoId);
};

exploreTodoCtrl.$inject = [
 'ExploreTodoManager',
 'ExploreTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreTodoData', ];

angular.module("app.explores").controller('ExploreTodoCtrl', exploreTodoCtrl);
