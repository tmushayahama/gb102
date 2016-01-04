var swipeTodoCtrl = function (
        SwipeTodoManager,
        SwipeTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        swipeTodoData) {
 var vm = this;
 vm.swipeId = swipeTodoData.swipe_id;
 vm.swipeTodoId = swipeTodoData.id;
 vm.swipeTodoManager = new SwipeTodoManager();
 vm.swipeTodoChecklistManager = new SwipeTodoChecklistManager();


 vm.todoId = swipeTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newSwipeTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSwipeTodoData = vm.defaultSwipeTodoData;

 vm.getSwipeTodo = function (swipeId, todoId) {
  vm.swipeTodoManager.getSwipeTodo(swipeId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSwipeTodo = function (data) {
  vm.swipeTodoManager.editSwipeTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeTodoSections = {
  details: function (details) {
   var swipeTodoData = {
    swipeTodoId: vm.swipeTodoId,
    title: details.title,
    description: details.description
   };
   vm.editSwipeTodo(swipeTodoData);
  }
 }

 vm.getSwipeTodoChecklist = function (todoId) {
  vm.swipeTodoChecklistManager.getSwipeTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createSwipeTodoChecklistItem = function (data) {
  vm.swipeTodoChecklistManager.createSwipeTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newSwipeTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeTodoChecklistItem = function (data) {
  vm.swipeTodoChecklistManager.editSwipeTodoChecklistItem(data).then(function (response) {
   vm.newSwipeTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var swipeTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editSwipeTodoChecklistItem(swipeTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newSwipeTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.swipeTodoChecklistManager.swipeTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.swipeTodoChecklistManager.swipeTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getSwipeTodo(vm.swipeId, vm.todoId);
 vm.getSwipeTodoChecklist(vm.todoId);
};

swipeTodoCtrl.$inject = [
 'SwipeTodoManager',
 'SwipeTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'swipeTodoData', ];

angular.module("app.swipes").controller('SwipeTodoCtrl', swipeTodoCtrl);
