var journalTodosCtrl = function (
        JournalTodosSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.journalId = $stateParams.journalId;
 vm.journalTodosSrv = new JournalTodosSrv();
 vm.todoFormDisplay = false;

 vm.defaultJournalTodoData = {
  journalId: $stateParams.journalId,
  privacy: 0
 };
 vm.newJournalTodoData = angular.copy(vm.defaultJournalTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createJournalTodo = function (data) {
  vm.journalTodosSrv.createJournalTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newJournalTodoData = angular.copy(vm.defaultJournalTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalTodo = function (data) {
  vm.journalTodosSrv.editJournalTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newJournalTodoData = angular.copy(vm.defaultJournalTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalTodoSections = {
  title: function (journalTodoId, title) {
   var journalTodoData = {
    journalTodoId: journalTodoId,
    title: title
   };
   vm.editJournalTodo(journalTodoData);
  }
 }

 vm.cancelJournalTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newJournalTodoData = angular.copy(vm.defaultJournalTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.journalTodos;
 }), function () {
  //vm.remainingCount = filterFilter(journalTodos, {completed: false}).length;
  vm.doneCount = vm.journalTodosSrv.journalTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //JournalTodoService.put(vm.journalTodos);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.editTodo = function (journalTodo) {
  vm.editedTodo = journalTodo;
  // Clone the original journalTodo to restore it on demand.
  vm.originalTodo = angular.copy(journalTodo);
 };


 vm.doneEditing = function (journalTodo) {
  vm.editedTodo = null;
  journalTodo.title = journalTodo.title.trim();

  if (!journalTodo.title) {
   vm.removeTodo(journalTodo);
  }
 };

 vm.openJournalTodo = function (journalTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'journal-todo-modal.html',
   controller: 'JournalTodoCtrl as journalTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    journalTodoData: function () {
     return journalTodo;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.journalTodosSrv.getJournalTodos(vm.journalId);
};

journalTodosCtrl.$inject = [
 'JournalTodosSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.journal").controller('JournalTodosCtrl', journalTodosCtrl);
