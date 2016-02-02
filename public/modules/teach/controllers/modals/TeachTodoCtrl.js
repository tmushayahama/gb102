var teachTodoCtrl = function (
        TeachTodoManager,
        TeachTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        teachTodoData) {
 var vm = this;
 vm.teachId = teachTodoData.teach_id;
 vm.teachTodoId = teachTodoData.id;
 vm.teachTodoManager = new TeachTodoManager();
 vm.teachTodoChecklistManager = new TeachTodoChecklistManager();


 vm.todoId = teachTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newTeachTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newTeachTodoData = vm.defaultTeachTodoData;

 vm.getTeachTodo = function (teachId, todoId) {
  vm.teachTodoManager.getTeachTodo(teachId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editTeachTodo = function (data) {
  vm.teachTodoManager.editTeachTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachTodoSections = {
  details: function (details) {
   var teachTodoData = {
    teachTodoId: vm.teachTodoId,
    title: details.title,
    description: details.description
   };
   vm.editTeachTodo(teachTodoData);
  }
 }

 vm.getTeachTodoChecklist = function (todoId) {
  vm.teachTodoChecklistManager.getTeachTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createTeachTodoChecklistItem = function (data) {
  vm.teachTodoChecklistManager.createTeachTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newTeachTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachTodoChecklistItem = function (data) {
  vm.teachTodoChecklistManager.editTeachTodoChecklistItem(data).then(function (response) {
   vm.newTeachTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var teachTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editTeachTodoChecklistItem(teachTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newTeachTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.teachTodoChecklistManager.teachTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.teachTodoChecklistManager.teachTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getTeachTodo(vm.teachId, vm.todoId);
 vm.getTeachTodoChecklist(vm.todoId);
};

teachTodoCtrl.$inject = [
 'TeachTodoManager',
 'TeachTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'teachTodoData', ];

angular.module("app.teach").controller('TeachTodoCtrl', teachTodoCtrl);
