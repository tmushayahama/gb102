var addJournalCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        journalLevels) {
 var vm = this;

 vm.journal = "";
 vm.journalLevels = journalLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.journal);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addJournalCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'journalLevels'];

angular.module("app.journals").controller('AddJournalCtrl', addJournalCtrl);
