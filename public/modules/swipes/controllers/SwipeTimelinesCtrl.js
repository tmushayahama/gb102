var swipeTimelinesCtrl = function (
        SwipeTimelinesManager,
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
 vm.swipeId = $stateParams.swipeId;
 vm.swipeTimelinesCopy;
 vm.swipeTimelinesManager = new SwipeTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultSwipeTimelineData = {
  swipeId: $stateParams.swipeId,
  privacy: 0
 }
 vm.newSwipeTimelineData = angular.copy(vm.defaultSwipeTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createSwipeTimeline = function (data) {
  vm.swipeTimelinesManager.createSwipeTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newSwipeTimelineData = angular.copy(vm.defaultSwipeTimelineData);
   vm.swipeTimelinesCopy = angular.copy(vm.swipeTimelinesManager.swipeTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeTimeline = function (data) {
  vm.swipeTimelinesManager.editSwipeTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newSwipeTimelineData = angular.copy(vm.defaultSwipeTimelineData);
   vm.swipeTimelinesCopy = angular.copy(vm.swipeTimelinesManager.swipeTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeTimelineSections = {
  details: function (swipeTimelineId, detail) {
   var swipeTimelineData = {
    swipeTimelineId: swipeTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editSwipeTimeline(swipeTimelineData);
  }
 }

 vm.cancelSwipeTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newSwipeTimelineData = angular.copy(vm.defaultSwipeTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertSwipeTimeline = function (swipeTimeline, swipeTimelineCopy) {
  swipeTimeline = swipeTimelineCopy;
  /*
   $filter('filter')
   (vm.swipeTimelinesManager.swipeTimelines, {id: swipeTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.swipeTimelinesCopy, {id: swipeTimelineId}, true)[0]);
   if (swipeTimeline.length && swipeTimelineCopy.length) {
   // vm.swipeTimelinesManager.swipeTimelines angular.copy(vm.swipeTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.swipeTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(swipeTimelines, {completed: false}).length;
  vm.doneCount = vm.swipeTimelinesManager.swipeTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SwipeTimelineService.put(vm.swipeTimelines);
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




 vm.editTimeline = function (swipeTimeline) {
  vm.editedTimeline = swipeTimeline;
  // Clone the original swipeTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(swipeTimeline);
 };


 vm.doneEditing = function (swipeTimeline) {
  vm.editedTimeline = null;
  swipeTimeline.title = swipeTimeline.title.trim();

  if (!swipeTimeline.title) {
   vm.removeTimeline(swipeTimeline);
  }
 };

 vm.openSwipeTimeline = function (swipeTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'swipe-timeline-modal.html',
   controller: 'SwipeTimelineCtrl as swipeTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    swipeTimelineData: function () {
     return swipeTimeline;
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
 vm.swipeTimelinesManager.getSwipeTimelines(vm.swipeId);
};

swipeTimelinesCtrl.$inject = [
 'SwipeTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipes").controller('SwipeTimelinesCtrl', swipeTimelinesCtrl);
