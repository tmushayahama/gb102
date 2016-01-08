var questionnaireWeblinksCtrl = function (
        QuestionnaireWeblinksManager,
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
 vm.questionnaireWeblinksCopy;
 vm.questionnaireWeblinksManager = new QuestionnaireWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultQuestionnaireWeblinkData = {
  questionnaireId: $stateParams.questionnaireId,
  privacy: 0
 }
 vm.newQuestionnaireWeblinkData = angular.copy(vm.defaultQuestionnaireWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createQuestionnaireWeblink = function (data) {
  vm.questionnaireWeblinksManager.createQuestionnaireWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newQuestionnaireWeblinkData = angular.copy(vm.defaultQuestionnaireWeblinkData);
   vm.questionnaireWeblinksCopy = angular.copy(vm.questionnaireWeblinksManager.questionnaireWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireWeblink = function (data) {
  vm.questionnaireWeblinksManager.editQuestionnaireWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newQuestionnaireWeblinkData = angular.copy(vm.defaultQuestionnaireWeblinkData);
   vm.questionnaireWeblinksCopy = angular.copy(vm.questionnaireWeblinksManager.questionnaireWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireWeblinkSections = {
  details: function (questionnaireWeblinkId, detail) {
   var questionnaireWeblinkData = {
    questionnaireWeblinkId: questionnaireWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editQuestionnaireWeblink(questionnaireWeblinkData);
  }
 }

 vm.cancelQuestionnaireWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newQuestionnaireWeblinkData = angular.copy(vm.defaultQuestionnaireWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertQuestionnaireWeblink = function (questionnaireWeblink, questionnaireWeblinkCopy) {
  questionnaireWeblink = questionnaireWeblinkCopy;
  /*
   $filter('filter')
   (vm.questionnaireWeblinksManager.questionnaireWeblinks, {id: questionnaireWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.questionnaireWeblinksCopy, {id: questionnaireWeblinkId}, true)[0]);
   if (questionnaireWeblink.length && questionnaireWeblinkCopy.length) {
   // vm.questionnaireWeblinksManager.questionnaireWeblinks angular.copy(vm.questionnaireWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.questionnaireWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(questionnaireWeblinks, {completed: false}).length;
  vm.doneCount = vm.questionnaireWeblinksManager.questionnaireWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionnaireWeblinkService.put(vm.questionnaireWeblinks);
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




 vm.editWeblink = function (questionnaireWeblink) {
  vm.editedWeblink = questionnaireWeblink;
  // Clone the original questionnaireWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(questionnaireWeblink);
 };


 vm.doneEditing = function (questionnaireWeblink) {
  vm.editedWeblink = null;
  questionnaireWeblink.title = questionnaireWeblink.title.trim();

  if (!questionnaireWeblink.title) {
   vm.removeWeblink(questionnaireWeblink);
  }
 };

 vm.openQuestionnaireWeblink = function (questionnaireWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'questionnaire-weblink-modal.html',
   controller: 'QuestionnaireWeblinkCtrl as questionnaireWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    questionnaireWeblinkData: function () {
     return questionnaireWeblink;
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
 vm.questionnaireWeblinksManager.getQuestionnaireWeblinks(vm.questionnaireId);
};

questionnaireWeblinksCtrl.$inject = [
 'QuestionnaireWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnaireWeblinksCtrl', questionnaireWeblinksCtrl);
