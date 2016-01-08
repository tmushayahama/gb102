var questionnairesMineCtrl = function (
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
 vm.questionnairesManager.getMyQuestionnaires();
};


questionnairesMineCtrl.$inject = [
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

angular.module("app.questionnaire").controller('QuestionnairesMineCtrl', questionnairesMineCtrl);
