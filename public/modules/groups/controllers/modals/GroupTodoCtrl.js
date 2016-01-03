var groupTodoCtrl = function (
        GroupTodoManager,
        GroupTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        groupTodoData) {
 var vm = this;
 vm.groupId = groupTodoData.group_id;
 vm.groupTodoId = groupTodoData.id;
 vm.groupTodoManager = new GroupTodoManager();
 vm.groupTodoChecklistManager = new GroupTodoChecklistManager();


 vm.todoId = groupTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newGroupTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGroupTodoData = vm.defaultGroupTodoData;

 vm.getGroupTodo = function (groupId, todoId) {
  vm.groupTodoManager.getGroupTodo(groupId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGroupTodo = function (data) {
  vm.groupTodoManager.editGroupTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupTodoSections = {
  details: function (details) {
   var groupTodoData = {
    groupTodoId: vm.groupTodoId,
    title: details.title,
    description: details.description
   };
   vm.editGroupTodo(groupTodoData);
  }
 }

 vm.getGroupTodoChecklist = function (todoId) {
  vm.groupTodoChecklistManager.getGroupTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createGroupTodoChecklistItem = function (data) {
  vm.groupTodoChecklistManager.createGroupTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newGroupTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupTodoChecklistItem = function (data) {
  vm.groupTodoChecklistManager.editGroupTodoChecklistItem(data).then(function (response) {
   vm.newGroupTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var groupTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editGroupTodoChecklistItem(groupTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newGroupTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.groupTodoChecklistManager.groupTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.groupTodoChecklistManager.groupTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getGroupTodo(vm.groupId, vm.todoId);
 vm.getGroupTodoChecklist(vm.todoId);
};

groupTodoCtrl.$inject = [
 'GroupTodoManager',
 'GroupTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'groupTodoData', ];

angular.module("app.groups").controller('GroupTodoCtrl', groupTodoCtrl);
