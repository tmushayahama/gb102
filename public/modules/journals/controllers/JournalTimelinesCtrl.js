var journalTimelinesCtrl = function (
        JournalTimelinesManager,
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
 vm.journalId = $stateParams.journalId;
 vm.journalTimelinesCopy;
 vm.journalTimelinesManager = new JournalTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultJournalTimelineData = {
  journalId: $stateParams.journalId,
  privacy: 0
 }
 vm.newJournalTimelineData = angular.copy(vm.defaultJournalTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createJournalTimeline = function (data) {
  vm.journalTimelinesManager.createJournalTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newJournalTimelineData = angular.copy(vm.defaultJournalTimelineData);
   vm.journalTimelinesCopy = angular.copy(vm.journalTimelinesManager.journalTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalTimeline = function (data) {
  vm.journalTimelinesManager.editJournalTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newJournalTimelineData = angular.copy(vm.defaultJournalTimelineData);
   vm.journalTimelinesCopy = angular.copy(vm.journalTimelinesManager.journalTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalTimelineSections = {
  details: function (journalTimelineId, detail) {
   var journalTimelineData = {
    journalTimelineId: journalTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editJournalTimeline(journalTimelineData);
  }
 }

 vm.cancelJournalTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newJournalTimelineData = angular.copy(vm.defaultJournalTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertJournalTimeline = function (journalTimeline, journalTimelineCopy) {
  journalTimeline = journalTimelineCopy;
  /*
   $filter('filter')
   (vm.journalTimelinesManager.journalTimelines, {id: journalTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.journalTimelinesCopy, {id: journalTimelineId}, true)[0]);
   if (journalTimeline.length && journalTimelineCopy.length) {
   // vm.journalTimelinesManager.journalTimelines angular.copy(vm.journalTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.journalTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(journalTimelines, {completed: false}).length;
  vm.doneCount = vm.journalTimelinesManager.journalTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //JournalTimelineService.put(vm.journalTimelines);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.editTimeline = function (journalTimeline) {
  vm.editedTimeline = journalTimeline;
  // Clone the original journalTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(journalTimeline);
 };


 vm.doneEditing = function (journalTimeline) {
  vm.editedTimeline = null;
  journalTimeline.title = journalTimeline.title.trim();

  if (!journalTimeline.title) {
   vm.removeTimeline(journalTimeline);
  }
 };

 vm.openJournalTimeline = function (journalTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'journal-timeline-modal.html',
   controller: 'JournalTimelineCtrl as journalTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    journalTimelineData: function () {
     return journalTimeline;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.journalTimelinesManager.getJournalTimelines(vm.journalId);
};

journalTimelinesCtrl.$inject = [
 'JournalTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.journals").controller('JournalTimelinesCtrl', journalTimelinesCtrl);
