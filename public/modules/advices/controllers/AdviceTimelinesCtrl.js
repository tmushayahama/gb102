var adviceTimelinesCtrl = function (
        AdviceTimelinesManager,
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
 vm.adviceId = $stateParams.adviceId;
 vm.adviceTimelinesCopy;
 vm.adviceTimelinesManager = new AdviceTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultAdviceTimelineData = {
  adviceId: $stateParams.adviceId,
  privacy: 0
 }
 vm.newAdviceTimelineData = angular.copy(vm.defaultAdviceTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createAdviceTimeline = function (data) {
  vm.adviceTimelinesManager.createAdviceTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newAdviceTimelineData = angular.copy(vm.defaultAdviceTimelineData);
   vm.adviceTimelinesCopy = angular.copy(vm.adviceTimelinesManager.adviceTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceTimeline = function (data) {
  vm.adviceTimelinesManager.editAdviceTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newAdviceTimelineData = angular.copy(vm.defaultAdviceTimelineData);
   vm.adviceTimelinesCopy = angular.copy(vm.adviceTimelinesManager.adviceTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceTimelineSections = {
  details: function (adviceTimelineId, detail) {
   var adviceTimelineData = {
    adviceTimelineId: adviceTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editAdviceTimeline(adviceTimelineData);
  }
 }

 vm.cancelAdviceTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newAdviceTimelineData = angular.copy(vm.defaultAdviceTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertAdviceTimeline = function (adviceTimeline, adviceTimelineCopy) {
  adviceTimeline = adviceTimelineCopy;
  /*
   $filter('filter')
   (vm.adviceTimelinesManager.adviceTimelines, {id: adviceTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.adviceTimelinesCopy, {id: adviceTimelineId}, true)[0]);
   if (adviceTimeline.length && adviceTimelineCopy.length) {
   // vm.adviceTimelinesManager.adviceTimelines angular.copy(vm.adviceTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.adviceTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(adviceTimelines, {completed: false}).length;
  vm.doneCount = vm.adviceTimelinesManager.adviceTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //AdviceTimelineService.put(vm.adviceTimelines);
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




 vm.editTimeline = function (adviceTimeline) {
  vm.editedTimeline = adviceTimeline;
  // Clone the original adviceTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(adviceTimeline);
 };


 vm.doneEditing = function (adviceTimeline) {
  vm.editedTimeline = null;
  adviceTimeline.title = adviceTimeline.title.trim();

  if (!adviceTimeline.title) {
   vm.removeTimeline(adviceTimeline);
  }
 };

 vm.openAdviceTimeline = function (adviceTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'advice-timeline-modal.html',
   controller: 'AdviceTimelineCtrl as adviceTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    adviceTimelineData: function () {
     return adviceTimeline;
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
 vm.adviceTimelinesManager.getAdviceTimelines(vm.adviceId);
};

adviceTimelinesCtrl.$inject = [
 'AdviceTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.advices").controller('AdviceTimelinesCtrl', adviceTimelinesCtrl);
