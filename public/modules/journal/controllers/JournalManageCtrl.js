var journalManageCtrl = function (
        JournalSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.journalId = $stateParams.journalId;
 vm.journals;
 vm.journalSrv = new JournalSrv();

 vm.getJournal = function (id) {
  vm.journalSrv.getJournal(id).then(function (data) {
   vm.journal = data;
   vm.getSubJournals(vm.journal.explorer_id);
  });
 };

 vm.getSubJournals = function (explorerId) {
  vm.journalSrv.getSubJournals(explorerId).then(function (data) {
   vm.journals = data;
  });
 }

 vm.getJournal(vm.journalId);

};

journalManageCtrl.$inject = [
 'JournalSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.journal").controller('JournalManageCtrl', journalManageCtrl);
