var groupTimelinesCtrl = function (
        GroupTimelinesManager,
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
 vm.groupId = $stateParams.groupId;
 vm.groupTimelinesCopy;
 vm.groupTimelinesManager = new GroupTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultGroupTimelineData = {
  groupId: $stateParams.groupId,
  privacy: 0
 }
 vm.newGroupTimelineData = angular.copy(vm.defaultGroupTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createGroupTimeline = function (data) {
  vm.groupTimelinesManager.createGroupTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newGroupTimelineData = angular.copy(vm.defaultGroupTimelineData);
   vm.groupTimelinesCopy = angular.copy(vm.groupTimelinesManager.groupTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupTimeline = function (data) {
  vm.groupTimelinesManager.editGroupTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newGroupTimelineData = angular.copy(vm.defaultGroupTimelineData);
   vm.groupTimelinesCopy = angular.copy(vm.groupTimelinesManager.groupTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupTimelineSections = {
  details: function (groupTimelineId, detail) {
   var groupTimelineData = {
    groupTimelineId: groupTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editGroupTimeline(groupTimelineData);
  }
 }

 vm.cancelGroupTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newGroupTimelineData = angular.copy(vm.defaultGroupTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertGroupTimeline = function (groupTimeline, groupTimelineCopy) {
  groupTimeline = groupTimelineCopy;
  /*
   $filter('filter')
   (vm.groupTimelinesManager.groupTimelines, {id: groupTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.groupTimelinesCopy, {id: groupTimelineId}, true)[0]);
   if (groupTimeline.length && groupTimelineCopy.length) {
   // vm.groupTimelinesManager.groupTimelines angular.copy(vm.groupTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.groupTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(groupTimelines, {completed: false}).length;
  vm.doneCount = vm.groupTimelinesManager.groupTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GroupTimelineService.put(vm.groupTimelines);
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




 vm.editTimeline = function (groupTimeline) {
  vm.editedTimeline = groupTimeline;
  // Clone the original groupTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(groupTimeline);
 };


 vm.doneEditing = function (groupTimeline) {
  vm.editedTimeline = null;
  groupTimeline.title = groupTimeline.title.trim();

  if (!groupTimeline.title) {
   vm.removeTimeline(groupTimeline);
  }
 };

 vm.openGroupTimeline = function (groupTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'group-timeline-modal.html',
   controller: 'GroupTimelineCtrl as groupTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    groupTimelineData: function () {
     return groupTimeline;
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
 vm.groupTimelinesManager.getGroupTimelines(vm.groupId);
};

groupTimelinesCtrl.$inject = [
 'GroupTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.groups").controller('GroupTimelinesCtrl', groupTimelinesCtrl);
