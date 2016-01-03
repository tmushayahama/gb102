var journalTimelineCtrl = function (
        JournalTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        journalTimelineData) {
 var vm = this;
 vm.journalId = journalTimelineData.journal_id;
 vm.journalTimelineId = journalTimelineData.id;
 vm.journalTimelineManager = new JournalTimelineManager();


 vm.timelineId = journalTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newJournalTimelineData = vm.defaultJournalTimelineData;

 vm.getJournalTimeline = function (journalId, timelineId) {
  vm.journalTimelineManager.getJournalTimeline(journalId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editJournalTimeline = function (data) {
  vm.journalTimelineManager.editJournalTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalTimelineSections = {
  details: function (details) {
   var journalTimelineData = {
    journalTimelineId: vm.journalTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editJournalTimeline(journalTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getJournalTimeline(vm.journalId, vm.timelineId);
};


journalTimelineCtrl.$inject = [
 'JournalTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'journalTimelineData'];

angular.module("app.journals").controller('JournalTimelineCtrl', journalTimelineCtrl);
