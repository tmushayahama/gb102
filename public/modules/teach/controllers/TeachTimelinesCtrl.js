var teachProgressCtrl = function (
        TeachProgressManager,
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
 vm.teachProgressCopy;
 vm.teachProgressManager = new TeachProgressManager();
 vm.progressFormDisplay = false;

 vm.defaultTeachProgressData = {
  teachId: $stateParams.teachId,
  privacy: 0
 }
 vm.newTeachProgressData = angular.copy(vm.defaultTeachProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createTeachProgress = function (data) {
  vm.teachProgressManager.createTeachProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newTeachProgressData = angular.copy(vm.defaultTeachProgressData);
   vm.teachProgressCopy = angular.copy(vm.teachProgressManager.teachProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachProgress = function (data) {
  vm.teachProgressManager.editTeachProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newTeachProgressData = angular.copy(vm.defaultTeachProgressData);
   vm.teachProgressCopy = angular.copy(vm.teachProgressManager.teachProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachProgressSections = {
  details: function (teachProgressId, detail) {
   var teachProgressData = {
    teachProgressId: teachProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editTeachTimeline(teachTimelineData);
  }
 }

 vm.cancelTeachTimeline = function (form) {
  vm.progressFormDisplay = false;
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
   templateUrl: 'teach-progress-modal.html',
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
