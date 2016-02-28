var journalsMineCtrl = function (
        ConstantsSrv,
        JournalsSrv,
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
 vm.journalsSrv = new JournalsSrv();
 vm.journalsSrv.getMyJournals();
};


journalsMineCtrl.$inject = [
 'ConstantsSrv',
 'JournalsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.journal").controller('JournalsMineCtrl', journalsMineCtrl);
