
var questionnaireCtrl = function (
        _,
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
        $filter,
        $css) {

 var vm = this;
 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-questionnaire.css'
 }, $scope);

 vm.questionnaire = [];
 var questionnaireData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.questionnaireIcons = [];
 vm.questionnaireIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomQuestionnaireIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.questionnaireIcons.length; j++) {
    var rand = getRand(0, vm.questionnaireIcons.length);
    rowArray.push(vm.questionnaireIcons[rand].name);
   }
   vm.questionnaireIconsArray.push(rowArray);
  }
 };


 vm.questionnaireId = $stateParams.questionnaireId;

 vm.questionnaireSrv = new QuestionnaireSrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.questionnaireFormDisplay = false;

 vm.getQuestionnaire = function (id, data) {
  vm.questionnaireSrv.getQuestionnaire(id, data).success(function (response) {
   vm.questionnaire = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultQuestionnaireData = {
  questionnaireId: $stateParams.questionnaireId,
  privacy: 0
 }
 vm.newQuestionnaireData = angular.copy(vm.defaultQuestionnaireData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createQuestionnaire = function (data) {
  vm.questionnaireSrv.createQuestionnaire(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newQuestionnaireData = angular.copy(vm.defaultQuestionnaireData);
   vm.questionnaireCopy = angular.copy(vm.questionnaireSrv.questionnaire);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaire = function (data) {
  vm.questionnaireSrv.editQuestionnaire(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newQuestionnaireData = angular.copy(vm.defaultQuestionnaireData);
   vm.questionnaireCopy = angular.copy(vm.questionnaireSrv.questionnaire);
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
   (vm.questionnaireSrv.questionnaire, {id: questionnaireId}, true)[0]
   = angular.copy($filter('filter')
   (vm.questionnaireCopy, {id: questionnaireId}, true)[0]);
   if (questionnaire.length && questionnaireCopy.length) {
   // vm.questionnaireSrv.questionnaire angular.copy(vm.questionnaireCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.questionnaire;
 }), function () {
  //vm.remainingCount = filterFilter(questionnaire, {completed: false}).length;
  vm.doneCount = vm.questionnaireSrv.questionnaire.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionnaireService.put(vm.questionnaire);
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

 //--------init------
 vm.questionnaireSrv.getQuestionnaire(vm.questionnaireId);
 vm.constantsSrv.getIcons(1).then(function (data) {
  vm.questionnaireIcons = data;
  vm.getRandomQuestionnaireIcons();
 });
};

questionnaireCtrl.$inject = ['_',
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
 '$filter',
 '$css'];

angular.module("app.questionnaire").controller('QuestionnaireCtrl', questionnaireCtrl);