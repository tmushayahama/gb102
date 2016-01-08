var questionnaireTimelinesCtrl = function (
        QuestionnaireTimelinesManager,
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
 vm.questionnaireTimelinesCopy;
 vm.questionnaireTimelinesManager = new QuestionnaireTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultQuestionnaireTimelineData = {
  questionnaireId: $stateParams.questionnaireId,
  privacy: 0
 }
 vm.newQuestionnaireTimelineData = angular.copy(vm.defaultQuestionnaireTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createQuestionnaireTimeline = function (data) {
  vm.questionnaireTimelinesManager.createQuestionnaireTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newQuestionnaireTimelineData = angular.copy(vm.defaultQuestionnaireTimelineData);
   vm.questionnaireTimelinesCopy = angular.copy(vm.questionnaireTimelinesManager.questionnaireTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireTimeline = function (data) {
  vm.questionnaireTimelinesManager.editQuestionnaireTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newQuestionnaireTimelineData = angular.copy(vm.defaultQuestionnaireTimelineData);
   vm.questionnaireTimelinesCopy = angular.copy(vm.questionnaireTimelinesManager.questionnaireTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireTimelineSections = {
  details: function (questionnaireTimelineId, detail) {
   var questionnaireTimelineData = {
    questionnaireTimelineId: questionnaireTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editQuestionnaireTimeline(questionnaireTimelineData);
  }
 }

 vm.cancelQuestionnaireTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newQuestionnaireTimelineData = angular.copy(vm.defaultQuestionnaireTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertQuestionnaireTimeline = function (questionnaireTimeline, questionnaireTimelineCopy) {
  questionnaireTimeline = questionnaireTimelineCopy;
  /*
   $filter('filter')
   (vm.questionnaireTimelinesManager.questionnaireTimelines, {id: questionnaireTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.questionnaireTimelinesCopy, {id: questionnaireTimelineId}, true)[0]);
   if (questionnaireTimeline.length && questionnaireTimelineCopy.length) {
   // vm.questionnaireTimelinesManager.questionnaireTimelines angular.copy(vm.questionnaireTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.questionnaireTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(questionnaireTimelines, {completed: false}).length;
  vm.doneCount = vm.questionnaireTimelinesManager.questionnaireTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionnaireTimelineService.put(vm.questionnaireTimelines);
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




 vm.editTimeline = function (questionnaireTimeline) {
  vm.editedTimeline = questionnaireTimeline;
  // Clone the original questionnaireTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(questionnaireTimeline);
 };


 vm.doneEditing = function (questionnaireTimeline) {
  vm.editedTimeline = null;
  questionnaireTimeline.title = questionnaireTimeline.title.trim();

  if (!questionnaireTimeline.title) {
   vm.removeTimeline(questionnaireTimeline);
  }
 };

 vm.openQuestionnaireTimeline = function (questionnaireTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'questionnaire-timeline-modal.html',
   controller: 'QuestionnaireTimelineCtrl as questionnaireTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    questionnaireTimelineData: function () {
     return questionnaireTimeline;
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
 vm.questionnaireTimelinesManager.getQuestionnaireTimelines(vm.questionnaireId);
};

questionnaireTimelinesCtrl.$inject = [
 'QuestionnaireTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnaireTimelinesCtrl', questionnaireTimelinesCtrl);
