var journalProgressCtrl = function (
        JournalProgressManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        journalProgressData) {
 var vm = this;
 vm.journalId = journalProgressData.journal_id;
 vm.journalProgressId = journalProgressData.id;
 vm.journalProgressManager = new JournalProgressManager();


 vm.progressId = journalProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newJournalProgressData = vm.defaultJournalProgressData;

 vm.getJournalProgress = function (journalId, progressId) {
  vm.journalProgressManager.getJournalProgress(journalId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editJournalProgress = function (data) {
  vm.journalProgressManager.editJournalProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalProgressSections = {
  details: function (details) {
   var journalProgressData = {
    journalProgressId: vm.journalProgressId,
    title: details.title,
    description: details.description
   };
   vm.editJournalProgress(journalProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getJournalProgress(vm.journalId, vm.progressId);
};


journalProgressCtrl.$inject = [
 'JournalProgressManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'journalProgressData'];

angular.module("app.journal").controller('JournalProgressCtrl', journalProgressCtrl);
