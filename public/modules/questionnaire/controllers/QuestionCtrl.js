
var questionCtrl = function (
        _,
        ConstantsManager,
        QuestionManager,
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

 vm.question = [];
 var questionData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.questionIcons = [];
 vm.questionIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomQuestionIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.questionIcons.length; j++) {
    var rand = getRand(0, vm.questionIcons.length);
    rowArray.push(vm.questionIcons[rand].name);
   }
   vm.questionIconsArray.push(rowArray);
  }
 };


 vm.questionId = $stateParams.questionId;

 vm.questionManager = new QuestionManager();
 vm.constantsManager = new ConstantsManager();

 vm.questionFormDisplay = false;

 vm.getQuestion = function (id, data) {
  vm.questionManager.getQuestion(id, data).success(function (response) {
   vm.question = response;
  }).error(function (response) {
   console.log(response);
  });
 };

 vm.defaultQuestionData = {
  questionId: $stateParams.questionId,
  privacy: 0
 }
 vm.newQuestionData = angular.copy(vm.defaultQuestionData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createQuestion = function (data) {
  vm.questionManager.createQuestion(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newQuestionData = angular.copy(vm.defaultQuestionData);
   vm.questionCopy = angular.copy(vm.questionManager.question);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestion = function (data) {
  vm.questionManager.editQuestion(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newQuestionData = angular.copy(vm.defaultQuestionData);
   vm.questionCopy = angular.copy(vm.questionManager.question);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionSections = {
  details: function (questionId, detail) {
   var questionData = {
    questionId: questionId,
    title: detail.title,
    description: detail.description
   };
   vm.editQuestion(questionData);
  }
 }

 vm.cancelQuestion = function (form) {
  vm.FormDisplay = false;
  vm.newQuestionData = angular.copy(vm.defaultQuestionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertQuestion = function (question, questionCopy) {
  question = questionCopy;
  /*
   $filter('filter')
   (vm.questionManager.question, {id: questionId}, true)[0]
   = angular.copy($filter('filter')
   (vm.questionCopy, {id: questionId}, true)[0]);
   if (question.length && questionCopy.length) {
   // vm.questionManager.question angular.copy(vm.questionCopy);
   }
   */
 };


 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.question;
 }), function () {
  //vm.remainingCount = filterFilter(question, {completed: false}).length;
  vm.doneCount = vm.questionManager.question.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionService.put(vm.question);
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




 vm.edit = function (question) {
  vm.edited = question;
  // Clone the original question to restore it on demand.
  vm.original = angular.copy(question);
 };


 vm.doneEditing = function (question) {
  vm.edited = null;
  question.title = question.title.trim();

  if (!question.title) {
   vm.remove(question);
  }
 };

 //--------init------
 vm.questionManager.getQuestion(vm.questionId).then(function (data) {
  $css.bind({
   href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-' + data.app_type.name.toLowerCase() + '.css'
  }, $scope);
 });
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.questionIcons = data;
  vm.getRandomQuestionIcons();
 });
};

questionCtrl.$inject = ['_',
 'ConstantsManager',
 'QuestionManager',
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

angular.module("app.questionnaire").controller('QuestionCtrl', questionCtrl);