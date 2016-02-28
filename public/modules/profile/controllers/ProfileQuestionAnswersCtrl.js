var profileQuestionAnswersCtrl = function (
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
 vm.profileId = $stateParams.profileId;

 vm.constantsSrv = new ConstantsSrv();
 vm.questionnaireLevels;

 vm.getProfileQuestionAnswers = function () {
  vm.questionnaireSrv.getQuestionAnswers(vm.profileId);
 };

 vm.questionnaireSrv = new QuestionnaireSrv();
 vm.getProfileQuestionAnswers();
 vm.constantsSrv.getLevel(11).then(function (data) {
  vm.questionnaireLevels = data;
 });

};


profileQuestionAnswersCtrl.$inject = [
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

angular.module("app.profile").controller('ProfileQuestionAnswersCtrl', profileQuestionAnswersCtrl);
