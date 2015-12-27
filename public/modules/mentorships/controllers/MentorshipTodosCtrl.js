var mentorshipTodosCtrl = function (
        MentorshipTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.mentorshipId = $stateParams.mentorshipId;
 vm.mentorshipTodosManager = new MentorshipTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultMentorshipTodoData = {
  mentorshipId: $stateParams.mentorshipId,
  privacy: 0
 };
 vm.newMentorshipTodoData = angular.copy(vm.defaultMentorshipTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createMentorshipTodo = function (data) {
  vm.mentorshipTodosManager.createMentorshipTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newMentorshipTodoData = angular.copy(vm.defaultMentorshipTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTodo = function (data) {
  vm.mentorshipTodosManager.editMentorshipTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newMentorshipTodoData = angular.copy(vm.defaultMentorshipTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTodoSections = {
  title: function (mentorshipTodoId, title) {
   var mentorshipTodoData = {
    mentorshipTodoId: mentorshipTodoId,
    title: title
   };
   vm.editMentorshipTodo(mentorshipTodoData);
  }
 }

 vm.cancelMentorshipTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newMentorshipTodoData = angular.copy(vm.defaultMentorshipTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.mentorshipTodos;
 }), function () {
  //vm.remainingCount = filterFilter(mentorshipTodos, {completed: false}).length;
  vm.doneCount = vm.mentorshipTodosManager.mentorshipTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //MentorshipTodoService.put(vm.mentorshipTodos);
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




 vm.editTodo = function (mentorshipTodo) {
  vm.editedTodo = mentorshipTodo;
  // Clone the original mentorshipTodo to restore it on demand.
  vm.originalTodo = angular.copy(mentorshipTodo);
 };


 vm.doneEditing = function (mentorshipTodo) {
  vm.editedTodo = null;
  mentorshipTodo.title = mentorshipTodo.title.trim();

  if (!mentorshipTodo.title) {
   vm.removeTodo(mentorshipTodo);
  }
 };

 vm.openMentorshipTodo = function (mentorshipTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'mentorship-todo-modal.html',
   controller: 'MentorshipTodoCtrl as mentorshipTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    mentorshipTodoData: function () {
     return mentorshipTodo;
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
 vm.mentorshipTodosManager.getMentorshipTodos(vm.mentorshipId);
};

mentorshipTodosCtrl.$inject = [
 'MentorshipTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.mentorships").controller('MentorshipTodosCtrl', mentorshipTodosCtrl);
