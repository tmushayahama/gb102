var hobbyTodoCtrl = function (
        HobbyTodoManager,
        HobbyTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        hobbyTodoData) {
 var vm = this;
 vm.hobbyId = hobbyTodoData.hobby_id;
 vm.hobbyTodoId = hobbyTodoData.id;
 vm.hobbyTodoManager = new HobbyTodoManager();
 vm.hobbyTodoChecklistManager = new HobbyTodoChecklistManager();


 vm.todoId = hobbyTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newHobbyTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newHobbyTodoData = vm.defaultHobbyTodoData;

 vm.getHobbyTodo = function (hobbyId, todoId) {
  vm.hobbyTodoManager.getHobbyTodo(hobbyId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editHobbyTodo = function (data) {
  vm.hobbyTodoManager.editHobbyTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobbyTodoSections = {
  details: function (details) {
   var hobbyTodoData = {
    hobbyTodoId: vm.hobbyTodoId,
    title: details.title,
    description: details.description
   };
   vm.editHobbyTodo(hobbyTodoData);
  }
 }

 vm.getHobbyTodoChecklist = function (todoId) {
  vm.hobbyTodoChecklistManager.getHobbyTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createHobbyTodoChecklistItem = function (data) {
  vm.hobbyTodoChecklistManager.createHobbyTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newHobbyTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobbyTodoChecklistItem = function (data) {
  vm.hobbyTodoChecklistManager.editHobbyTodoChecklistItem(data).then(function (response) {
   vm.newHobbyTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobbyTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var hobbyTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editHobbyTodoChecklistItem(hobbyTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newHobbyTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.hobbyTodoChecklistManager.hobbyTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.hobbyTodoChecklistManager.hobbyTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getHobbyTodo(vm.hobbyId, vm.todoId);
 vm.getHobbyTodoChecklist(vm.todoId);
};

hobbyTodoCtrl.$inject = [
 'HobbyTodoManager',
 'HobbyTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'hobbyTodoData', ];

angular.module("app.hobbys").controller('HobbyTodoCtrl', hobbyTodoCtrl);
