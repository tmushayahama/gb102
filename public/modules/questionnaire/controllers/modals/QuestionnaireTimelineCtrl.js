var questionnaireTimelineCtrl = function (
        QuestionnaireTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        questionnaireTimelineData) {
 var vm = this;
 vm.questionnaireId = questionnaireTimelineData.questionnaire_id;
 vm.questionnaireTimelineId = questionnaireTimelineData.id;
 vm.questionnaireTimelineManager = new QuestionnaireTimelineManager();


 vm.timelineId = questionnaireTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newQuestionnaireTimelineData = vm.defaultQuestionnaireTimelineData;

 vm.getQuestionnaireTimeline = function (questionnaireId, timelineId) {
  vm.questionnaireTimelineManager.getQuestionnaireTimeline(questionnaireId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editQuestionnaireTimeline = function (data) {
  vm.questionnaireTimelineManager.editQuestionnaireTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireTimelineSections = {
  details: function (details) {
   var questionnaireTimelineData = {
    questionnaireTimelineId: vm.questionnaireTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editQuestionnaireTimeline(questionnaireTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getQuestionnaireTimeline(vm.questionnaireId, vm.timelineId);
};


questionnaireTimelineCtrl.$inject = [
 'QuestionnaireTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'questionnaireTimelineData'];

angular.module("app.questionnaire").controller('QuestionnaireTimelineCtrl', questionnaireTimelineCtrl);
