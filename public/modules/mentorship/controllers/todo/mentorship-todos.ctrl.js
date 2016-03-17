var mentorshipTodosCtrl = function (
        level_categories,
        MentorshipTodosSrv,
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
 vm.mentorshipTodos;
 vm.mentorshipTodosSrv = new MentorshipTodosSrv();
 vm.todoFormDisplay = false;

 vm.getMentorshipTodoPercentage = function (mentorshipTodoId) {
  return 100;
 };

 vm.todoChecklistCount = function (todoId) {
  vm.mentorshipTodosSrv.todoChecklistCount(todoId)
          .then(function (data) {
           return data;
          });
 };

 vm.showTodoForm = function (todoId) {
  vm.mentorshipTodosSrv.todoChecklistCount(vm.mentorshipId, level_categories.todo_level_normal)
          .then(function (data) {
           vm.mentorshipTodos = data;
          });
 };

 vm.defaultMentorshipTodoData = {
  mentorshipId: $stateParams.mentorshipId,
  privacy: 0
 };
 vm.newMentorshipTodoData = angular.copy(vm.defaultMentorshipTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createMentorshipTodo = function (data) {
  data.level_id = level_categories.todo_level_normal;
  data.status_id = level_categories.todo_status_in_progress;
  vm.mentorshipTodosSrv.createMentorshipTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newMentorshipTodoData = angular.copy(vm.defaultMentorshipTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTodo = function (data) {
  vm.mentorshipTodosSrv.editMentorshipTodo(data).then(function (response) {
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
  vm.doneCount = vm.mentorshipTodosSrv.mentorshipTodos.length - vm.remainingCount;
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
 vm.mentorshipTodosSrv.getMentorshipTodos(vm.mentorshipId, level_categories.todo_level_normal)
         .then(function (data) {
          vm.mentorshipTodos = data;
         });
};

mentorshipTodosCtrl.$inject = [
 'level_categories',
 'MentorshipTodosSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.mentorship").controller('MentorshipTodosCtrl', mentorshipTodosCtrl);
