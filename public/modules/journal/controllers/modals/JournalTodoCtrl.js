var journalTodoCtrl = function (
        JournalTodoManager,
        JournalTodoChecklistManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        journalTodoData) {
 var vm = this;
 vm.journalId = journalTodoData.journal_id;
 vm.journalTodoId = journalTodoData.id;
 vm.journalTodoManager = new JournalTodoManager();
 vm.journalTodoChecklistManager = new JournalTodoChecklistManager();


 vm.todoId = journalTodoData.todo_id;
 vm.checklistFormVisible = false;

 vm.todoFormDisplay = false;


 vm.defaultTodoChecklistData = {
  todoId: vm.todoId,
  privacy: 0
 }
 vm.newJournalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newJournalTodoData = vm.defaultJournalTodoData;

 vm.getJournalTodo = function (journalId, todoId) {
  vm.journalTodoManager.getJournalTodo(journalId, todoId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editJournalTodo = function (data) {
  vm.journalTodoManager.editJournalTodo(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalTodoSections = {
  details: function (details) {
   var journalTodoData = {
    journalTodoId: vm.journalTodoId,
    title: details.title,
    description: details.description
   };
   vm.editJournalTodo(journalTodoData);
  }
 }

 vm.getJournalTodoChecklist = function (todoId) {
  vm.journalTodoChecklistManager.getJournalTodoChecklist(todoId).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createJournalTodoChecklistItem = function (data) {
  vm.journalTodoChecklistManager.createJournalTodoChecklistItem(data).then(function (response) {
   vm.checklistFormVisible = false;
   vm.newJournalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalTodoChecklistItem = function (data) {
  vm.journalTodoChecklistManager.editJournalTodoChecklistItem(data).then(function (response) {
   vm.newJournalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalTodoChecklistItemSections = {
  title: function (checklistId, title) {
   var journalTodoChecklistItemData = {
    checklistId: checklistId,
    title: title
   };
   vm.editJournalTodoChecklistItem(journalTodoChecklistItemData);
  }
 }



 vm.cancelChecklistForm = function (form) {
  vm.checklistFormVisible = false;
  vm.newJournalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
  //$scope.user = angular.copy($scope.master);
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.journalTodoChecklistManager.journalTodoChecklist;
 }), function () {
  //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
  vm.doneCount = vm.journalTodoChecklistManager.journalTodoChecklist.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TodoChecklistService.put(vm.todoChecklist);
 }, true);

 //--------init------
 vm.getJournalTodo(vm.journalId, vm.todoId);
 vm.getJournalTodoChecklist(vm.todoId);
};

journalTodoCtrl.$inject = [
 'JournalTodoManager',
 'JournalTodoChecklistManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'journalTodoData', ];

angular.module("app.journal").controller('JournalTodoCtrl', journalTodoCtrl);
