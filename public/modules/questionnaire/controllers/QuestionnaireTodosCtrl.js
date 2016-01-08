var questionnaireTodosCtrl = function (
        QuestionnaireTodosManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log) {

 var vm = this;
 vm.questionnaireId = $stateParams.questionnaireId;
 vm.questionnaireTodosManager = new QuestionnaireTodosManager();
 vm.todoFormDisplay = false;

 vm.defaultQuestionnaireTodoData = {
  questionnaireId: $stateParams.questionnaireId,
  privacy: 0
 };
 vm.newQuestionnaireTodoData = angular.copy(vm.defaultQuestionnaireTodoData);

 vm.showTodoForm = function () {
  vm.todoFormDisplay = true;
 };

 vm.createQuestionnaireTodo = function (data) {
  vm.questionnaireTodosManager.createQuestionnaireTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newQuestionnaireTodoData = angular.copy(vm.defaultQuestionnaireTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireTodo = function (data) {
  vm.questionnaireTodosManager.editQuestionnaireTodo(data).then(function (response) {
   vm.todoFormDisplay = false;
   vm.newQuestionnaireTodoData = angular.copy(vm.defaultQuestionnaireTodoData);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireTodoSections = {
  title: function (questionnaireTodoId, title) {
   var questionnaireTodoData = {
    questionnaireTodoId: questionnaireTodoId,
    title: title
   };
   vm.editQuestionnaireTodo(questionnaireTodoData);
  }
 }

 vm.cancelQuestionnaireTodo = function (form) {
  vm.todoFormDisplay = false;
  vm.newQuestionnaireTodoData = angular.copy(vm.defaultQuestionnaireTodoData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };






 vm.editedTodo = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.questionnaireTodos;
 }), function () {
  //vm.remainingCount = filterFilter(questionnaireTodos, {completed: false}).length;
  vm.doneCount = vm.questionnaireTodosManager.questionnaireTodos.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionnaireTodoService.put(vm.questionnaireTodos);
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




 vm.editTodo = function (questionnaireTodo) {
  vm.editedTodo = questionnaireTodo;
  // Clone the original questionnaireTodo to restore it on demand.
  vm.originalTodo = angular.copy(questionnaireTodo);
 };


 vm.doneEditing = function (questionnaireTodo) {
  vm.editedTodo = null;
  questionnaireTodo.title = questionnaireTodo.title.trim();

  if (!questionnaireTodo.title) {
   vm.removeTodo(questionnaireTodo);
  }
 };

 vm.openQuestionnaireTodo = function (questionnaireTodo) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'questionnaire-todo-modal.html',
   controller: 'QuestionnaireTodoCtrl as questionnaireTodoCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    questionnaireTodoData: function () {
     return questionnaireTodo;
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
 vm.questionnaireTodosManager.getQuestionnaireTodos(vm.questionnaireId);
};

questionnaireTodosCtrl.$inject = [
 'QuestionnaireTodosManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log'];

angular.module("app.questionnaire").controller('QuestionnaireTodosCtrl', questionnaireTodosCtrl);
