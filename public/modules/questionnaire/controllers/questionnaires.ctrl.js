
var questionnairesCtrl = function (
        level_categories,
        ConstantsSrv,
        QuestionnairesSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-questionnaire.css'
 }, $scope);

 vm.questionnairesSrv = new QuestionnairesSrv();
 vm.constantsSrv = new ConstantsSrv();
 $rootScope.appName = 'MATCHER';
 vm.questionnaireLevels;


 vm.createQuestionnaire = function (data) {
  vm.questionnairesSrv.createQuestionnaire(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newQuestionnaireData = angular.copy(vm.defaultQuestionnaireData);
   vm.questionnairesCopy = angular.copy(vm.questionnairesSrv.questionnaires);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaire = function (data) {
  vm.questionnairesSrv.editQuestionnaire(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newQuestionnaireData = angular.copy(vm.defaultQuestionnaireData);
   vm.questionnairesCopy = angular.copy(vm.questionnairesSrv.questionnaires);
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

 vm.revertQuestionnaire = function (questionnaire, questionnaireCopy) {
  questionnaire = questionnaireCopy;
  /*
   $filter('filter')
   (vm.questionnairesSrv.questionnaires, {id: questionnaireId}, true)[0]
   = angular.copy($filter('filter')
   (vm.questionnairesCopy, {id: questionnaireId}, true)[0]);
   if (questionnaire.length && questionnaireCopy.length) {
   // vm.questionnairesSrv.questionnaires angular.copy(vm.questionnairesCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.questionnaires;
 }), function () {
  //vm.remainingCount = filterFilter(questionnaires, {completed: false}).length;
  vm.doneCount = vm.questionnairesSrv.questionnaires.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionnaireService.put(vm.questionnaires);
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




 vm.edit = function (questionnaire) {
  vm.edited = questionnaire;
  // Clone the original questionnaire to restore it on demand.
  vm.original = angular.copy(questionnaire);
 };


 vm.doneEditing = function (questionnaire) {
  vm.edited = null;
  questionnaire.title = questionnaire.title.trim();

  if (!questionnaire.title) {
   vm.remove(questionnaire);
  }
 };

 vm.openAddQuestionnaireModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-questionnaire-modal.html',
   controller: 'AddQuestionnaireCtrl as addQuestionnaireCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    questionnaireLevels: function () {
     return vm.questionnaireLevels;
    }
   }
  });

  modalInstance.result.then(function (questionnaire) {
   vm.questionnairesSrv.createQuestionnaire(questionnaire);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.questionnairesSrv.getQuestionnaires(vm.questionnaireId);
 vm.constantsSrv.getLevel(level_categories.questionnaire).then(function (data) {
  vm.questionnaireLevels = data;
 });
};

questionnairesCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'QuestionnairesSrv',
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