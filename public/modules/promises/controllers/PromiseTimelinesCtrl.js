var promiseTimelinesCtrl = function (
        PromiseTimelinesManager,
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
 vm.promiseId = $stateParams.promiseId;
 vm.promiseTimelinesCopy;
 vm.promiseTimelinesManager = new PromiseTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultPromiseTimelineData = {
  promiseId: $stateParams.promiseId,
  privacy: 0
 }
 vm.newPromiseTimelineData = angular.copy(vm.defaultPromiseTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createPromiseTimeline = function (data) {
  vm.promiseTimelinesManager.createPromiseTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newPromiseTimelineData = angular.copy(vm.defaultPromiseTimelineData);
   vm.promiseTimelinesCopy = angular.copy(vm.promiseTimelinesManager.promiseTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editPromiseTimeline = function (data) {
  vm.promiseTimelinesManager.editPromiseTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newPromiseTimelineData = angular.copy(vm.defaultPromiseTimelineData);
   vm.promiseTimelinesCopy = angular.copy(vm.promiseTimelinesManager.promiseTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editPromiseTimelineSections = {
  details: function (promiseTimelineId, detail) {
   var promiseTimelineData = {
    promiseTimelineId: promiseTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editPromiseTimeline(promiseTimelineData);
  }
 }

 vm.cancelPromiseTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newPromiseTimelineData = angular.copy(vm.defaultPromiseTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertPromiseTimeline = function (promiseTimeline, promiseTimelineCopy) {
  promiseTimeline = promiseTimelineCopy;
  /*
   $filter('filter')
   (vm.promiseTimelinesManager.promiseTimelines, {id: promiseTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.promiseTimelinesCopy, {id: promiseTimelineId}, true)[0]);
   if (promiseTimeline.length && promiseTimelineCopy.length) {
   // vm.promiseTimelinesManager.promiseTimelines angular.copy(vm.promiseTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.promiseTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(promiseTimelines, {completed: false}).length;
  vm.doneCount = vm.promiseTimelinesManager.promiseTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //PromiseTimelineService.put(vm.promiseTimelines);
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




 vm.editTimeline = function (promiseTimeline) {
  vm.editedTimeline = promiseTimeline;
  // Clone the original promiseTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(promiseTimeline);
 };


 vm.doneEditing = function (promiseTimeline) {
  vm.editedTimeline = null;
  promiseTimeline.title = promiseTimeline.title.trim();

  if (!promiseTimeline.title) {
   vm.removeTimeline(promiseTimeline);
  }
 };

 vm.openPromiseTimeline = function (promiseTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'promise-timeline-modal.html',
   controller: 'PromiseTimelineCtrl as promiseTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    promiseTimelineData: function () {
     return promiseTimeline;
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
 vm.promiseTimelinesManager.getPromiseTimelines(vm.promiseId);
};

promiseTimelinesCtrl.$inject = [
 'PromiseTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.promises").controller('PromiseTimelinesCtrl', promiseTimelinesCtrl);
