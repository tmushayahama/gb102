var questionAnswersCtrl = function (
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

 vm.getQuestionAnswers = function () {
  vm.questionnaireManager.getQuestionAnswers();
 };

 vm.questionnaireManager = new QuestionnaireManager();
 vm.getQuestionAnswers();
 vm.constantsManager.getLevel(11).then(function (data) {
  vm.questionnaireLevels = data;
 });

};


questionAnswersCtrl.$inject = [
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

angular.module("app.questionnaire").controller('QuestionAnswersCtrl', questionAnswersCtrl);
