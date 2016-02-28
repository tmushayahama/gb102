var questionnairesAllCtrl = function (
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
        $filter) {

 var vm = this;

 vm.questionnairesSrv = new QuestionnairesSrv();
 vm.questionnairesSrv.getAllQuestionnaires();
};

questionnairesAllCtrl.$inject = [
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
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnairesAllCtrl', questionnairesAllCtrl);
