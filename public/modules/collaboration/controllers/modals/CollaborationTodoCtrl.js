var collaborationTodoCtrl = function (
        CollaborationTodoSrv,
        CollaborationTodoChecklistSrv,
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
 vm.collaborationTodoSrv = new CollaborationTodoSrv();
 vm.collaborationTodoChecklistSrv = new CollaborationTodoChecklistSrv();


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
  vm.collaborationTodoSrv.getCollaborationTodo(collaborationId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCollaborationTodo = function (data) {
  vm.collaborationTodoSrv.editCollaborationTodo(data).then(function (response) {
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
  vm.collaborationTodoChecklistSrv.getCollaborationTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createCollaborationTodoChecklistItem = function (data) {
  vm.collaborationTodoChecklistSrv.createCollaborationTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newCollaborationTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationTodoChecklistItem = function (data) {
  vm.collaborationTodoChecklistSrv.editCollaborationTodoChecklistItem(data).then(function (response) {
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
  return vm.collaborationTodoChecklistSrv.collaborationTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.collaborationTodoChecklistSrv.collaborationTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getCollaborationTodo(vm.collaborationId, vm.todoId);
 vm.getCollaborationTodoChecklist(vm.todoId);
};

collaborationTodoCtrl.$inject = [
 'CollaborationTodoSrv',
 'CollaborationTodoChecklistSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'collaborationTodoData', ];

angular.module("app.collaboration").controller('CollaborationTodoCtrl', collaborationTodoCtrl);
