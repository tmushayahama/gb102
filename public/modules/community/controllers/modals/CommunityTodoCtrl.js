var communityTodoCtrl = function (
        CommunityTodoManager,
        CommunityTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        communityTodoData) {
 var vm = this;
 vm.communityId = communityTodoData.community_id;
 vm.communityTodoId = communityTodoData.id;
 vm.communityTodoManager = new CommunityTodoManager();
 vm.communityTodoChecklistManager = new CommunityTodoChecklistManager();


 vm.todoId = communityTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newCommunityTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCommunityTodoData = vm.defaultCommunityTodoData;

 vm.getCommunityTodo = function (communityId, todoId) {
  vm.communityTodoManager.getCommunityTodo(communityId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCommunityTodo = function (data) {
  vm.communityTodoManager.editCommunityTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityTodoSections = {
  details: function (details) {
   var communityTodoData = {
    communityTodoId: vm.communityTodoId,
    title: details.title,
    description: details.description
   };
   vm.editCommunityTodo(communityTodoData);
  }
 }

 vm.getCommunityTodoChecklist = function (todoId) {
  vm.communityTodoChecklistManager.getCommunityTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createCommunityTodoChecklistItem = function (data) {
  vm.communityTodoChecklistManager.createCommunityTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newCommunityTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityTodoChecklistItem = function (data) {
  vm.communityTodoChecklistManager.editCommunityTodoChecklistItem(data).then(function (response) {
   vm.newCommunityTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var communityTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editCommunityTodoChecklistItem(communityTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newCommunityTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.communityTodoChecklistManager.communityTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.communityTodoChecklistManager.communityTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getCommunityTodo(vm.communityId, vm.todoId);
 vm.getCommunityTodoChecklist(vm.todoId);
};

communityTodoCtrl.$inject = [
 'CommunityTodoManager',
 'CommunityTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'communityTodoData', ];

angular.module("app.communitys").controller('CommunityTodoCtrl', communityTodoCtrl);
