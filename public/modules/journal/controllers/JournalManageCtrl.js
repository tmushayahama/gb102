var journalManageCtrl = function (
        JournalManager,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.journalId = $stateParams.journalId;
 vm.journals;
 vm.journalManager = new JournalManager();

 vm.getJournal = function (id) {
  vm.journalManager.getJournal(id).then(function (data) {
   vm.journal = data;
   vm.getSubJournals(vm.journal.explore_id);
  });
 };

 vm.getSubJournals = function (exploreId) {
  vm.journalManager.getSubJournals(exploreId).then(function (data) {
   vm.journals = data;
  });
 }

 vm.getJournal(vm.journalId);

};

journalManageCtrl.$inject = [
 'JournalManager',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.journal").controller('JournalManageCtrl', journalManageCtrl);
