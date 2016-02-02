var teachTimelinesCtrl = function (
        TeachTimelinesManager,
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
 vm.teachId = $stateParams.teachId;
 vm.teachTimelinesCopy;
 vm.teachTimelinesManager = new TeachTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultTeachTimelineData = {
  teachId: $stateParams.teachId,
  privacy: 0
 }
 vm.newTeachTimelineData = angular.copy(vm.defaultTeachTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createTeachTimeline = function (data) {
  vm.teachTimelinesManager.createTeachTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newTeachTimelineData = angular.copy(vm.defaultTeachTimelineData);
   vm.teachTimelinesCopy = angular.copy(vm.teachTimelinesManager.teachTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachTimeline = function (data) {
  vm.teachTimelinesManager.editTeachTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newTeachTimelineData = angular.copy(vm.defaultTeachTimelineData);
   vm.teachTimelinesCopy = angular.copy(vm.teachTimelinesManager.teachTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachTimelineSections = {
  details: function (teachTimelineId, detail) {
   var teachTimelineData = {
    teachTimelineId: teachTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editTeachTimeline(teachTimelineData);
  }
 }

 vm.cancelTeachTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newTeachTimelineData = angular.copy(vm.defaultTeachTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertTeachTimeline = function (teachTimeline, teachTimelineCopy) {
  teachTimeline = teachTimelineCopy;
  /*
   $filter('filter')
   (vm.teachTimelinesManager.teachTimelines, {id: teachTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.teachTimelinesCopy, {id: teachTimelineId}, true)[0]);
   if (teachTimeline.length && teachTimelineCopy.length) {
   // vm.teachTimelinesManager.teachTimelines angular.copy(vm.teachTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.teachTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(teachTimelines, {completed: false}).length;
  vm.doneCount = vm.teachTimelinesManager.teachTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TeachTimelineService.put(vm.teachTimelines);
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




 vm.editTimeline = function (teachTimeline) {
  vm.editedTimeline = teachTimeline;
  // Clone the original teachTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(teachTimeline);
 };


 vm.doneEditing = function (teachTimeline) {
  vm.editedTimeline = null;
  teachTimeline.title = teachTimeline.title.trim();

  if (!teachTimeline.title) {
   vm.removeTimeline(teachTimeline);
  }
 };

 vm.openTeachTimeline = function (teachTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'teach-timeline-modal.html',
   controller: 'TeachTimelineCtrl as teachTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    teachTimelineData: function () {
     return teachTimeline;
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
 vm.teachTimelinesManager.getTeachTimelines(vm.teachId);
};

teachTimelinesCtrl.$inject = [
 'TeachTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.teach").controller('TeachTimelinesCtrl', teachTimelinesCtrl);
