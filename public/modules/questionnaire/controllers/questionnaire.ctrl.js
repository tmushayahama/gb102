var questionnaireCtrl = function (
        level_categories,
        ConstantsSrv,
        ComponentsSrv,
        $scope,
        $timeout,
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
 vm.component;
 vm.questionnaireLevels;

 vm.questionnaireRight = function ($event, questionnaireQuestionId) {

  var ele = $event.target;
  //var x = Math.floor(Math.random() * 200) + 1,
  $(ele).css({
   'transform': "translate(50%, 30%) rotate(" + 20 + "deg)",
   'opacity': "0.3"

  });
  $timeout(function () {
   $(ele).css({
    'transform': "translate(0%, 0%) rotate(" + 0 + "deg)",
    'opacity': "1"
   });
  }, 1000);
 };

 vm.notNow = function ($event) {
  vm.getQuestionnaireQuestion();
  var ele = $event.target;
  //var x = Math.floor(Math.random() * 200) + 1,
  $(ele).css({
   'transform': "translate(-50%, 30%) rotate(" + -20 + "deg)",
   'opacity': "0.3"

  });
  $timeout(function () {
   $(ele).css({
    'transform': "translate(0%, 0%) rotate(" + 0 + "deg)",
    'opacity': "1"
   });
  }, 1000);
 };

 vm.answer = function (component, data) {
  vm.createQuestionAnswer(
          component.question.id,
          data.description);
 };


 vm.getQuestionnaireQuestion = function () {
  vm.componentsSrv.getRandomComponent(level_categories.component.question).then(function (response) {
   vm.component = response;
  });
 };

 vm.createQuestionAnswer = function (questionId, description) {
  var data = {
   questionId: questionId,
   description: description
  };
  vm.componentsSrv.createQuestionAnswer(data).then(function (response) {
   vm.getQuestionnaireQuestion();
   $scope.description = '';
  });
 };

 vm.viewQuestionnaire = function () {
  vm.componentsSrv.getQuestionnaires();
 };

 vm.componentsSrv = new ComponentsSrv();
 vm.getQuestionnaireQuestion();
 vm.constantsSrv.getSubLevels(11).then(function (data) {
  vm.questionnaireLevels = data;
 });

};


questionnaireCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'ComponentsSrv',
 '$scope',
 '$timeout',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnaireCtrl', questionnaireCtrl);
