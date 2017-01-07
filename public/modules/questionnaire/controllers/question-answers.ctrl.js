var questionAnswersCtrl = function (
        level_categories,
        ConstantsSrv,
        QuestionnaireSrv,
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

 vm.constantsSrv = new ConstantsSrv();
 vm.questionnaireLevels;

 vm.createQuestionnaire = function (explorerId, levelId) {
  var data = {
   explorerId: explorerId,
   levelId: levelId,
   description: ""
  };
  vm.questionnaireSrv.createQuestionnaire(data).then(function (response) {
   //vm.currentExplorer = response;
  });
  vm.getQuestionnaire();
 };

 vm.getQuestionAnswers = function () {
  vm.questionnaireSrv.getAllQuestionAnswers();
 };

 vm.questionnaireSrv = new QuestionnaireSrv();
 vm.getQuestionAnswers();
 vm.constantsSrv.getSubLevels(11).then(function (data) {
  vm.questionnaireLevels = data;
 });

};


questionAnswersCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'QuestionnaireSrv',
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
