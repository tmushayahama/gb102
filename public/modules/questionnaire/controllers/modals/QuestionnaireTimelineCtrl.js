var questionnaireProgressCtrl = function (
        QuestionnaireProgressSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        questionnaireProgressData) {
 var vm = this;
 vm.questionnaireId = questionnaireProgressData.questionnaire_id;
 vm.questionnaireProgressId = questionnaireProgressData.id;
 vm.questionnaireProgressSrv = new QuestionnaireProgressSrv();


 vm.progressId = questionnaireProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newQuestionnaireProgressData = vm.defaultQuestionnaireProgressData;

 vm.getQuestionnaireProgress = function (questionnaireId, progressId) {
  vm.questionnaireProgressSrv.getQuestionnaireProgress(questionnaireId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editQuestionnaireProgress = function (data) {
  vm.questionnaireProgressSrv.editQuestionnaireProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireProgressSections = {
  details: function (details) {
   var questionnaireProgressData = {
    questionnaireProgressId: vm.questionnaireProgressId,
    title: details.title,
    description: details.description
   };
   vm.editQuestionnaireProgress(questionnaireProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getQuestionnaireProgress(vm.questionnaireId, vm.progressId);
};


questionnaireProgressCtrl.$inject = [
 'QuestionnaireProgressSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'questionnaireProgressData'];

angular.module("app.questionnaire").controller('QuestionnaireProgressCtrl', questionnaireProgressCtrl);
