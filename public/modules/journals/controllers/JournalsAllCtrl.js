var journalsAllCtrl = function (
        ConstantsManager,
        JournalsManager,
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

 vm.journalsManager = new JournalsManager();
 vm.journalsManager.getAllJournals();
};

journalsAllCtrl.$inject = [
 'ConstantsManager',
 'JournalsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.journals").controller('JournalsAllCtrl', journalsAllCtrl);
