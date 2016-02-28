var questionnairesMineCtrl = function (
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
 vm.questionnairesSrv.getMyQuestionnaires();
};


questionnairesMineCtrl.$inject = [
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

angular.module("app.questionnaire").controller('QuestionnairesMineCtrl', questionnairesMineCtrl);
