
var questionnairesCtrl = function (
        level_categories,
        ConstantsSrv,
        ComponentsSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 var vm = this;

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-matcher.css'
 }, $scope);

 vm.componentsSrv = new ComponentsSrv();
 vm.constantsSrv = new ConstantsSrv();
 $rootScope.appName = 'MATCHER';
 vm.questionnaireLevels;


 vm.createQuestionnaire = function (data) {
  vm.componentsSrv.createQuestionnaire(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newQuestionnaireData = angular.copy(vm.defaultQuestionnaireData);
   vm.questionnairesCopy = angular.copy(vm.componentsSrv.questionnaires);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaire = function (data) {
  vm.componentsSrv.editQuestionnaire(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newQuestionnaireData = angular.copy(vm.defaultQuestionnaireData);
   vm.questionnairesCopy = angular.copy(vm.componentsSrv.questionnaires);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireSections = {
  details: function (questionnaireId, detail) {
   var questionnaireData = {
    questionnaireId: questionnaireId,
    title: detail.title,
    description: detail.description
   };
   vm.editQuestionnaire(questionnaireData);
  }
 }

 vm.cancelQuestionnaire = function (form) {
  vm.FormDisplay = false;
  vm.newQuestionnaireData = angular.copy(vm.defaultQuestionnaireData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 //--------init------
 //vm.componentsSrv.getQuestionnaires(vm.questionnaireId);
 vm.constantsSrv.getLevel(level_categories.questionnaire).then(function (data) {
  vm.questionnaireLevels = data;
 });
};

questionnairesCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'ComponentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.questionnaire").controller('QuestionnairesCtrl', questionnairesCtrl);