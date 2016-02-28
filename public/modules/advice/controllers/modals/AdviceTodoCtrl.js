var adviceTodoCtrl = function (
        AdviceTodoSrv,
        AdviceTodoChecklistSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        adviceTodoData) {
 var vm = this;
 vm.adviceId = adviceTodoData.advice_id;
 vm.adviceTodoId = adviceTodoData.id;
 vm.adviceTodoSrv = new AdviceTodoSrv();
 vm.adviceTodoChecklistSrv = new AdviceTodoChecklistSrv();


 vm.todoId = adviceTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newAdviceTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newAdviceTodoData = vm.defaultAdviceTodoData;

 vm.getAdviceTodo = function (adviceId, todoId) {
  vm.adviceTodoSrv.getAdviceTodo(adviceId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editAdviceTodo = function (data) {
  vm.adviceTodoSrv.editAdviceTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceTodoSections = {
  details: function (details) {
   var adviceTodoData = {
    adviceTodoId: vm.adviceTodoId,
    title: details.title,
    description: details.description
   };
   vm.editAdviceTodo(adviceTodoData);
  }
 }

 vm.getAdviceTodoChecklist = function (todoId) {
  vm.adviceTodoChecklistSrv.getAdviceTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createAdviceTodoChecklistItem = function (data) {
  vm.adviceTodoChecklistSrv.createAdviceTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newAdviceTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceTodoChecklistItem = function (data) {
  vm.adviceTodoChecklistSrv.editAdviceTodoChecklistItem(data).then(function (response) {
   vm.newAdviceTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var adviceTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editAdviceTodoChecklistItem(adviceTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newAdviceTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.adviceTodoChecklistSrv.adviceTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.adviceTodoChecklistSrv.adviceTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getAdviceTodo(vm.adviceId, vm.todoId);
 vm.getAdviceTodoChecklist(vm.todoId);
};

adviceTodoCtrl.$inject = [
 'AdviceTodoSrv',
 'AdviceTodoChecklistSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'adviceTodoData', ];

angular.module("app.advice").controller('AdviceTodoCtrl', adviceTodoCtrl);
