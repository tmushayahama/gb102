var profileQuestionAnswersCtrl = function (
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
 vm.profileId = $stateParams.profileId;

 vm.constantsManager = new ConstantsManager();
 vm.questionnaireLevels;

 vm.getProfileQuestionAnswers = function () {
  vm.questionnaireManager.getQuestionAnswers(vm.profileId);
 };

 vm.questionnaireManager = new QuestionnaireManager();
 vm.getProfileQuestionAnswers();
 vm.constantsManager.getLevel(11).then(function (data) {
  vm.questionnaireLevels = data;
 });

};


profileQuestionAnswersCtrl.$inject = [
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

angular.module("app.profile").controller('ProfileQuestionAnswersCtrl', profileQuestionAnswersCtrl);