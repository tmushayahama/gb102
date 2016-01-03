var collaborationTodoCtrl = function (
        CollaborationTodoManager,
        CollaborationTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        collaborationTodoData) {
 var vm = this;
 vm.collaborationId = collaborationTodoData.collaboration_id;
 vm.collaborationTodoId = collaborationTodoData.id;
 vm.collaborationTodoManager = new CollaborationTodoManager();
 vm.collaborationTodoChecklistManager = new CollaborationTodoChecklistManager();


 vm.todoId = collaborationTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newCollaborationTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCollaborationTodoData = vm.defaultCollaborationTodoData;

 vm.getCollaborationTodo = function (collaborationId, todoId) {
  vm.collaborationTodoManager.getCollaborationTodo(collaborationId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCollaborationTodo = function (data) {
  vm.collaborationTodoManager.editCollaborationTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationTodoSections = {
  details: function (details) {
   var collaborationTodoData = {
    collaborationTodoId: vm.collaborationTodoId,
    title: details.title,
    description: details.description
   };
   vm.editCollaborationTodo(collaborationTodoData);
  }
 }

 vm.getCollaborationTodoChecklist = function (todoId) {
  vm.collaborationTodoChecklistManager.getCollaborationTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createCollaborationTodoChecklistItem = function (data) {
  vm.collaborationTodoChecklistManager.createCollaborationTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newCollaborationTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationTodoChecklistItem = function (data) {
  vm.collaborationTodoChecklistManager.editCollaborationTodoChecklistItem(data).then(function (response) {
   vm.newCollaborationTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var collaborationTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editCollaborationTodoChecklistItem(collaborationTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newCollaborationTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.collaborationTodoChecklistManager.collaborationTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.collaborationTodoChecklistManager.collaborationTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getCollaborationTodo(vm.collaborationId, vm.todoId);
 vm.getCollaborationTodoChecklist(vm.todoId);
};

collaborationTodoCtrl.$inject = [
 'CollaborationTodoManager',
 'CollaborationTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'collaborationTodoData', ];

angular.module("app.collaborations").controller('CollaborationTodoCtrl', collaborationTodoCtrl);
