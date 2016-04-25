var mentorshipTodoCtrl = function (
        level_categories,
        ConstantsSrv,
        MentorshipTodosSrv,
        MentorshipTodoChecklistSrv,
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
 vm.mentorshipTodosSrv = new MentorshipTodosSrv();
 vm.mentorshipTodoChecklistSrv = new MentorshipTodoChecklistSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.progressStatusTypes;

 /*
  $scope.$watch(function () {
  return vm.mentorshipTodosSrv.mentorshipTodo.todo.status_id;
  }, function (newValue, oldValue) {
  console.log('From', oldValue, ' - ', newValue)
  });
  */

 vm.changeTodoStatus = function () {
  var data = {
   todo_id: vm.mentorshipTodosSrv.mentorshipTodo.todo_id,
   status_id: vm.mentorshipTodosSrv.mentorshipTodo.todo.status_id
  };
  vm.mentorshipTodosSrv.editTodoStatus(data).then(function (response) {

  });
 };

 vm.toggleChecklistStatus = function (checklist) {
  checklist.status = (checklist.status + 1) % 2;

  var data = {
   checklist_id: checklist.id,
   status: checklist.status
  };
  vm.mentorshipTodosSrv.editChecklistStatus(data).then(function (response) {

  });
 };

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
  vm.mentorshipTodosSrv.getMentorshipTodo(mentorshipId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editMentorshipTodo = function (data) {
  vm.mentorshipTodosSrv.editMentorshipTodo(data).then(function (response) {
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
  vm.mentorshipTodoChecklistSrv.getMentorshipTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createMentorshipTodoChecklistItem = function (data) {
  vm.mentorshipTodoChecklistSrv.createMentorshipTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newMentorshipTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTodoChecklistItem = function (data) {
  vm.mentorshipTodoChecklistSrv.editMentorshipTodoChecklistItem(data).then(function (response) {
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
  return vm.mentorshipTodoChecklistSrv.mentorshipTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.mentorshipTodoChecklistSrv.mentorshipTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getMentorshipTodo(vm.mentorshipId, vm.todoId);
 vm.getMentorshipTodoChecklist(vm.todoId);

 vm.constantsSrv.getLevel(level_categories.todo_level_progress).then(function (data) {
  vm.progressStatusTypes = data;
 });
};



mentorshipTodoCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'MentorshipTodosSrv',
 'MentorshipTodoChecklistSrv',
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
