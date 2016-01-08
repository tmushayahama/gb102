var questionnaireWeblinkCtrl = function (
        QuestionnaireWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        questionnaireWeblinkData) {
 var vm = this;
 vm.questionnaireId = questionnaireWeblinkData.questionnaire_id;
 vm.questionnaireWeblinkId = questionnaireWeblinkData.id;
 vm.questionnaireWeblinkManager = new QuestionnaireWeblinkManager();


 vm.weblinkId = questionnaireWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newQuestionnaireWeblinkData = vm.defaultQuestionnaireWeblinkData;

 vm.getQuestionnaireWeblink = function (questionnaireId, weblinkId) {
  vm.questionnaireWeblinkManager.getQuestionnaireWeblink(questionnaireId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editQuestionnaireWeblink = function (data) {
  vm.questionnaireWeblinkManager.editQuestionnaireWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireWeblinkSections = {
  details: function (details) {
   var questionnaireWeblinkData = {
    questionnaireWeblinkId: vm.questionnaireWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editQuestionnaireWeblink(questionnaireWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getQuestionnaireWeblink(vm.questionnaireId, vm.weblinkId);
};


questionnaireWeblinkCtrl.$inject = [
 'QuestionnaireWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'questionnaireWeblinkData'];

angular.module("app.questionnaire").controller('QuestionnaireWeblinkCtrl', questionnaireWeblinkCtrl);
