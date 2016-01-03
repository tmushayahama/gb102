var journalWeblinkCtrl = function (
        JournalWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        journalWeblinkData) {
 var vm = this;
 vm.journalId = journalWeblinkData.journal_id;
 vm.journalWeblinkId = journalWeblinkData.id;
 vm.journalWeblinkManager = new JournalWeblinkManager();


 vm.weblinkId = journalWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newJournalWeblinkData = vm.defaultJournalWeblinkData;

 vm.getJournalWeblink = function (journalId, weblinkId) {
  vm.journalWeblinkManager.getJournalWeblink(journalId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editJournalWeblink = function (data) {
  vm.journalWeblinkManager.editJournalWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalWeblinkSections = {
  details: function (details) {
   var journalWeblinkData = {
    journalWeblinkId: vm.journalWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editJournalWeblink(journalWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getJournalWeblink(vm.journalId, vm.weblinkId);
};


journalWeblinkCtrl.$inject = [
 'JournalWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'journalWeblinkData'];

angular.module("app.journals").controller('JournalWeblinkCtrl', journalWeblinkCtrl);
