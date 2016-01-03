var communityTimelinesCtrl = function (
        CommunityTimelinesManager,
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
 vm.communityId = $stateParams.communityId;
 vm.communityTimelinesCopy;
 vm.communityTimelinesManager = new CommunityTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultCommunityTimelineData = {
  communityId: $stateParams.communityId,
  privacy: 0
 }
 vm.newCommunityTimelineData = angular.copy(vm.defaultCommunityTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createCommunityTimeline = function (data) {
  vm.communityTimelinesManager.createCommunityTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newCommunityTimelineData = angular.copy(vm.defaultCommunityTimelineData);
   vm.communityTimelinesCopy = angular.copy(vm.communityTimelinesManager.communityTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityTimeline = function (data) {
  vm.communityTimelinesManager.editCommunityTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newCommunityTimelineData = angular.copy(vm.defaultCommunityTimelineData);
   vm.communityTimelinesCopy = angular.copy(vm.communityTimelinesManager.communityTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityTimelineSections = {
  details: function (communityTimelineId, detail) {
   var communityTimelineData = {
    communityTimelineId: communityTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editCommunityTimeline(communityTimelineData);
  }
 }

 vm.cancelCommunityTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newCommunityTimelineData = angular.copy(vm.defaultCommunityTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertCommunityTimeline = function (communityTimeline, communityTimelineCopy) {
  communityTimeline = communityTimelineCopy;
  /*
   $filter('filter')
   (vm.communityTimelinesManager.communityTimelines, {id: communityTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.communityTimelinesCopy, {id: communityTimelineId}, true)[0]);
   if (communityTimeline.length && communityTimelineCopy.length) {
   // vm.communityTimelinesManager.communityTimelines angular.copy(vm.communityTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.communityTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(communityTimelines, {completed: false}).length;
  vm.doneCount = vm.communityTimelinesManager.communityTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CommunityTimelineService.put(vm.communityTimelines);
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




 vm.editTimeline = function (communityTimeline) {
  vm.editedTimeline = communityTimeline;
  // Clone the original communityTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(communityTimeline);
 };


 vm.doneEditing = function (communityTimeline) {
  vm.editedTimeline = null;
  communityTimeline.title = communityTimeline.title.trim();

  if (!communityTimeline.title) {
   vm.removeTimeline(communityTimeline);
  }
 };

 vm.openCommunityTimeline = function (communityTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'community-timeline-modal.html',
   controller: 'CommunityTimelineCtrl as communityTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    communityTimelineData: function () {
     return communityTimeline;
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
 vm.communityTimelinesManager.getCommunityTimelines(vm.communityId);
};

communityTimelinesCtrl.$inject = [
 'CommunityTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.communitys").controller('CommunityTimelinesCtrl', communityTimelinesCtrl);
