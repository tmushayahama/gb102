var mentorshipTodoCtrl = function (
        MentorshipTodoManager,
        MentorshipTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        mentorshipTodoData) {
 var vm = this;
 vm.mentorshipId = mentorshipTodoData.mentorship_id;
 vm.mentorshipTodoId = mentorshipTodoData.id;
 vm.mentorshipTodoManager = new MentorshipTodoManager();
 vm.mentorshipTodoChecklistManager = new MentorshipTodoChecklistManager();


 vm.todoId = mentorshipTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newMentorshipTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newMentorshipTodoData = vm.defaultMentorshipTodoData;

 vm.getMentorshipTodo = function (mentorshipId, todoId) {
  vm.mentorshipTodoManager.getMentorshipTodo(mentorshipId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editMentorshipTodo = function (data) {
  vm.mentorshipTodoManager.editMentorshipTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTodoSections = {
  details: function (details) {
   var mentorshipTodoData = {
    mentorshipTodoId: vm.mentorshipTodoId,
    title: details.title,
    description: details.description
   };
   vm.editMentorshipTodo(mentorshipTodoData);
  }
 }

 vm.getMentorshipTodoChecklist = function (todoId) {
  vm.mentorshipTodoChecklistManager.getMentorshipTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createMentorshipTodoChecklistItem = function (data) {
  vm.mentorshipTodoChecklistManager.createMentorshipTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newMentorshipTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTodoChecklistItem = function (data) {
  vm.mentorshipTodoChecklistManager.editMentorshipTodoChecklistItem(data).then(function (response) {
   vm.newMentorshipTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var mentorshipTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editMentorshipTodoChecklistItem(mentorshipTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newMentorshipTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.mentorshipTodoChecklistManager.mentorshipTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.mentorshipTodoChecklistManager.mentorshipTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getMentorshipTodo(vm.mentorshipId, vm.todoId);
 vm.getMentorshipTodoChecklist(vm.todoId);
};

mentorshipTodoCtrl.$inject = [
 'MentorshipTodoManager',
 'MentorshipTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'mentorshipTodoData', ];

angular.module("app.mentorship").controller('MentorshipTodoCtrl', mentorshipTodoCtrl);
