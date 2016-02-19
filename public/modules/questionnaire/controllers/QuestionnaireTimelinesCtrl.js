var questionnaireProgressCtrl = function (
        QuestionnaireProgressManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.questionnaireId = $stateParams.questionnaireId;
 vm.questionnaireProgressCopy;
 vm.questionnaireProgressManager = new QuestionnaireProgressManager();
 vm.progressFormDisplay = false;

 vm.defaultQuestionnaireProgressData = {
  questionnaireId: $stateParams.questionnaireId,
  privacy: 0
 }
 vm.newQuestionnaireProgressData = angular.copy(vm.defaultQuestionnaireProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createQuestionnaireProgress = function (data) {
  vm.questionnaireProgressManager.createQuestionnaireProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newQuestionnaireProgressData = angular.copy(vm.defaultQuestionnaireProgressData);
   vm.questionnaireProgressCopy = angular.copy(vm.questionnaireProgressManager.questionnaireProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireProgress = function (data) {
  vm.questionnaireProgressManager.editQuestionnaireProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newQuestionnaireProgressData = angular.copy(vm.defaultQuestionnaireProgressData);
   vm.questionnaireProgressCopy = angular.copy(vm.questionnaireProgressManager.questionnaireProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireProgressSections = {
  details: function (questionnaireProgressId, detail) {
   var questionnaireProgressData = {
    questionnaireProgressId: questionnaireProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editQuestionnaireProgress(questionnaireProgressData);
  }
 }

 vm.cancelQuestionnaireProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newQuestionnaireProgressData = angular.copy(vm.defaultQuestionnaireProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertQuestionnaireProgress = function (questionnaireProgress, questionnaireProgressCopy) {
  questionnaireProgress = questionnaireProgressCopy;
  /*
   $filter('filter')
   (vm.questionnaireProgressManager.questionnaireProgress, {id: questionnaireProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.questionnaireProgressCopy, {id: questionnaireProgressId}, true)[0]);
   if (questionnaireProgress.length && questionnaireProgressCopy.length) {
   // vm.questionnaireProgressManager.questionnaireProgress angular.copy(vm.questionnaireProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.questionnaireProgress;
 }), function () {
  //vm.remainingCount = filterFilter(questionnaireProgress, {completed: false}).length;
  vm.doneCount = vm.questionnaireProgressManager.questionnaireProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionnaireProgressService.put(vm.questionnaireProgress);
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




 vm.editProgress = function (questionnaireProgress) {
  vm.editedProgress = questionnaireProgress;
  // Clone the original questionnaireProgress to restore it on demand.
  vm.originalProgress = angular.copy(questionnaireProgress);
 };


 vm.doneEditing = function (questionnaireProgress) {
  vm.editedProgress = null;
  questionnaireProgress.title = questionnaireProgress.title.trim();

  if (!questionnaireProgress.title) {
   vm.removeProgress(questionnaireProgress);
  }
 };

 vm.openQuestionnaireProgress = function (questionnaireProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'questionnaire-progress-modal.html',
   controller: 'QuestionnaireProgressCtrl as questionnaireProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    questionnaireProgressData: function () {
     return questionnaireProgress;
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
 vm.questionnaireProgressManager.getQuestionnaireProgress(vm.questionnaireId);
};

questionnaireProgressCtrl.$inject = [
 'QuestionnaireProgressManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnaireProgressCtrl', questionnaireProgressCtrl);
