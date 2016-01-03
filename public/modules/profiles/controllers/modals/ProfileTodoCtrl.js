var profileTodoCtrl = function (
        ProfileTodoManager,
        ProfileTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        profileTodoData) {
 var vm = this;
 vm.profileId = profileTodoData.profile_id;
 vm.profileTodoId = profileTodoData.id;
 vm.profileTodoManager = new ProfileTodoManager();
 vm.profileTodoChecklistManager = new ProfileTodoChecklistManager();


 vm.todoId = profileTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newProfileTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProfileTodoData = vm.defaultProfileTodoData;

 vm.getProfileTodo = function (profileId, todoId) {
  vm.profileTodoManager.getProfileTodo(profileId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProfileTodo = function (data) {
  vm.profileTodoManager.editProfileTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileTodoSections = {
  details: function (details) {
   var profileTodoData = {
    profileTodoId: vm.profileTodoId,
    title: details.title,
    description: details.description
   };
   vm.editProfileTodo(profileTodoData);
  }
 }

 vm.getProfileTodoChecklist = function (todoId) {
  vm.profileTodoChecklistManager.getProfileTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createProfileTodoChecklistItem = function (data) {
  vm.profileTodoChecklistManager.createProfileTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newProfileTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileTodoChecklistItem = function (data) {
  vm.profileTodoChecklistManager.editProfileTodoChecklistItem(data).then(function (response) {
   vm.newProfileTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var profileTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editProfileTodoChecklistItem(profileTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newProfileTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.profileTodoChecklistManager.profileTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.profileTodoChecklistManager.profileTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getProfileTodo(vm.profileId, vm.todoId);
 vm.getProfileTodoChecklist(vm.todoId);
};

profileTodoCtrl.$inject = [
 'ProfileTodoManager',
 'ProfileTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'profileTodoData', ];

angular.module("app.profiles").controller('ProfileTodoCtrl', profileTodoCtrl);
