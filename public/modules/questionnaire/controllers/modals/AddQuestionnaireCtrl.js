var addQuestionnaireCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        questionnaireLevels) {
 var vm = this;

 vm.questionnaire = "";
 vm.questionnaireLevels = questionnaireLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.questionnaire);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addQuestionnaireCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'questionnaireLevels'];

angular.module("app.questionnaire").controller('AddQuestionnaireCtrl', addQuestionnaireCtrl);
