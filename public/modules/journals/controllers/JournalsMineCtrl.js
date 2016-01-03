var journalsMineCtrl = function (
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
 vm.journalsManager.getMyJournals();
};


journalsMineCtrl.$inject = [
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

angular.module("app.journals").controller('JournalsMineCtrl', journalsMineCtrl);
