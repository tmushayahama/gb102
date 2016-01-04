var exploreTimelinesCtrl = function (
        ExploreTimelinesManager,
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
 vm.exploreId = $stateParams.exploreId;
 vm.exploreTimelinesCopy;
 vm.exploreTimelinesManager = new ExploreTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultExploreTimelineData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 }
 vm.newExploreTimelineData = angular.copy(vm.defaultExploreTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createExploreTimeline = function (data) {
  vm.exploreTimelinesManager.createExploreTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newExploreTimelineData = angular.copy(vm.defaultExploreTimelineData);
   vm.exploreTimelinesCopy = angular.copy(vm.exploreTimelinesManager.exploreTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreTimeline = function (data) {
  vm.exploreTimelinesManager.editExploreTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newExploreTimelineData = angular.copy(vm.defaultExploreTimelineData);
   vm.exploreTimelinesCopy = angular.copy(vm.exploreTimelinesManager.exploreTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreTimelineSections = {
  details: function (exploreTimelineId, detail) {
   var exploreTimelineData = {
    exploreTimelineId: exploreTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editExploreTimeline(exploreTimelineData);
  }
 }

 vm.cancelExploreTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newExploreTimelineData = angular.copy(vm.defaultExploreTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExploreTimeline = function (exploreTimeline, exploreTimelineCopy) {
  exploreTimeline = exploreTimelineCopy;
  /*
   $filter('filter')
   (vm.exploreTimelinesManager.exploreTimelines, {id: exploreTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.exploreTimelinesCopy, {id: exploreTimelineId}, true)[0]);
   if (exploreTimeline.length && exploreTimelineCopy.length) {
   // vm.exploreTimelinesManager.exploreTimelines angular.copy(vm.exploreTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.exploreTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(exploreTimelines, {completed: false}).length;
  vm.doneCount = vm.exploreTimelinesManager.exploreTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreTimelineService.put(vm.exploreTimelines);
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




 vm.editTimeline = function (exploreTimeline) {
  vm.editedTimeline = exploreTimeline;
  // Clone the original exploreTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(exploreTimeline);
 };


 vm.doneEditing = function (exploreTimeline) {
  vm.editedTimeline = null;
  exploreTimeline.title = exploreTimeline.title.trim();

  if (!exploreTimeline.title) {
   vm.removeTimeline(exploreTimeline);
  }
 };

 vm.openExploreTimeline = function (exploreTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explore-timeline-modal.html',
   controller: 'ExploreTimelineCtrl as exploreTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    exploreTimelineData: function () {
     return exploreTimeline;
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
 vm.exploreTimelinesManager.getExploreTimelines(vm.exploreId);
};

exploreTimelinesCtrl.$inject = [
 'ExploreTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explores").controller('ExploreTimelinesCtrl', exploreTimelinesCtrl);
