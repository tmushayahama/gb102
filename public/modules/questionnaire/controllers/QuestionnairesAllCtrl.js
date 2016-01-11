var questionnairesAllCtrl = function (
        ConstantsManager,
        QuestionnairesManager,
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

 vm.questionnairesManager = new QuestionnairesManager();
 vm.questionnairesManager.getAllQuestionnaires();
};

questionnairesAllCtrl.$inject = [
 'ConstantsManager',
 'QuestionnairesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnairesAllCtrl', questionnairesAllCtrl);