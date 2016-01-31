var mentorshipTimelinesCtrl = function (
        MentorshipTimelinesManager,
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
 vm.mentorshipId = $stateParams.mentorshipId;
 vm.mentorshipTimelinesCopy;
 vm.mentorshipTimelinesManager = new MentorshipTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultMentorshipTimelineData = {
  mentorshipId: $stateParams.mentorshipId,
  privacy: 0
 }
 vm.newMentorshipTimelineData = angular.copy(vm.defaultMentorshipTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createMentorshipTimeline = function (data) {
  vm.mentorshipTimelinesManager.createMentorshipTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newMentorshipTimelineData = angular.copy(vm.defaultMentorshipTimelineData);
   vm.mentorshipTimelinesCopy = angular.copy(vm.mentorshipTimelinesManager.mentorshipTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTimeline = function (data) {
  vm.mentorshipTimelinesManager.editMentorshipTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newMentorshipTimelineData = angular.copy(vm.defaultMentorshipTimelineData);
   vm.mentorshipTimelinesCopy = angular.copy(vm.mentorshipTimelinesManager.mentorshipTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipTimelineSections = {
  details: function (mentorshipTimelineId, detail) {
   var mentorshipTimelineData = {
    mentorshipTimelineId: mentorshipTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editMentorshipTimeline(mentorshipTimelineData);
  }
 }

 vm.cancelMentorshipTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newMentorshipTimelineData = angular.copy(vm.defaultMentorshipTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertMentorshipTimeline = function (mentorshipTimeline, mentorshipTimelineCopy) {
  mentorshipTimeline = mentorshipTimelineCopy;
  /*
   $filter('filter')
   (vm.mentorshipTimelinesManager.mentorshipTimelines, {id: mentorshipTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.mentorshipTimelinesCopy, {id: mentorshipTimelineId}, true)[0]);
   if (mentorshipTimeline.length && mentorshipTimelineCopy.length) {
   // vm.mentorshipTimelinesManager.mentorshipTimelines angular.copy(vm.mentorshipTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.mentorshipTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(mentorshipTimelines, {completed: false}).length;
  vm.doneCount = vm.mentorshipTimelinesManager.mentorshipTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //MentorshipTimelineService.put(vm.mentorshipTimelines);
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




 vm.editTimeline = function (mentorshipTimeline) {
  vm.editedTimeline = mentorshipTimeline;
  // Clone the original mentorshipTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(mentorshipTimeline);
 };


 vm.doneEditing = function (mentorshipTimeline) {
  vm.editedTimeline = null;
  mentorshipTimeline.title = mentorshipTimeline.title.trim();

  if (!mentorshipTimeline.title) {
   vm.removeTimeline(mentorshipTimeline);
  }
 };

 vm.openMentorshipTimeline = function (mentorshipTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'mentorship-timeline-modal.html',
   controller: 'MentorshipTimelineCtrl as mentorshipTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    mentorshipTimelineData: function () {
     return mentorshipTimeline;
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
 vm.mentorshipTimelinesManager.getMentorshipTimelines(vm.mentorshipId);
};

mentorshipTimelinesCtrl.$inject = [
 'MentorshipTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorship").controller('MentorshipTimelinesCtrl', mentorshipTimelinesCtrl);
