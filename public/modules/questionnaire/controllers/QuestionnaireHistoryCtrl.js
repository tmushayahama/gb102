var questionnaireHistoryCtrl = function (
        level_categories,
        ConstantsManager,
        QuestionnaireManager,
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

 vm.constantsManager = new ConstantsManager();
 vm.questionnaireLevels;

 vm.createQuestionnaire = function (exploreId, levelId) {
  var data = {
   exploreId: exploreId,
   levelId: levelId,
   description: ""
  };
  vm.questionnaireManager.createQuestionnaire(data).then(function (response) {
   //vm.currentExplore = response;
  });
  vm.getQuestionnaire();
 };

 vm.getQuestionnaireHistory = function () {
  vm.questionnaireManager.getQuestionnaires();
 };

 vm.questionnaireManager = new QuestionnaireManager();
 vm.getQuestionnaireHistory();
 vm.constantsManager.getLevel(11).then(function (data) {
  vm.questionnaireLevels = data;
 });

};


questionnaireHistoryCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'QuestionnaireManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnaireHistoryCtrl', questionnaireHistoryCtrl);
