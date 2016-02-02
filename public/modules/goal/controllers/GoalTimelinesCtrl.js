var goalTimelinesCtrl = function (
        GoalTimelinesManager,
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
 vm.goalId = $stateParams.goalId;
 vm.goalTimelinesCopy;
 vm.goalTimelinesManager = new GoalTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultGoalTimelineData = {
  goalId: $stateParams.goalId,
  privacy: 0
 }
 vm.newGoalTimelineData = angular.copy(vm.defaultGoalTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createGoalTimeline = function (data) {
  vm.goalTimelinesManager.createGoalTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newGoalTimelineData = angular.copy(vm.defaultGoalTimelineData);
   vm.goalTimelinesCopy = angular.copy(vm.goalTimelinesManager.goalTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalTimeline = function (data) {
  vm.goalTimelinesManager.editGoalTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newGoalTimelineData = angular.copy(vm.defaultGoalTimelineData);
   vm.goalTimelinesCopy = angular.copy(vm.goalTimelinesManager.goalTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalTimelineSections = {
  details: function (goalTimelineId, detail) {
   var goalTimelineData = {
    goalTimelineId: goalTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editGoalTimeline(goalTimelineData);
  }
 }

 vm.cancelGoalTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newGoalTimelineData = angular.copy(vm.defaultGoalTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertGoalTimeline = function (goalTimeline, goalTimelineCopy) {
  goalTimeline = goalTimelineCopy;
  /*
   $filter('filter')
   (vm.goalTimelinesManager.goalTimelines, {id: goalTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.goalTimelinesCopy, {id: goalTimelineId}, true)[0]);
   if (goalTimeline.length && goalTimelineCopy.length) {
   // vm.goalTimelinesManager.goalTimelines angular.copy(vm.goalTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.goalTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(goalTimelines, {completed: false}).length;
  vm.doneCount = vm.goalTimelinesManager.goalTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GoalTimelineService.put(vm.goalTimelines);
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




 vm.editTimeline = function (goalTimeline) {
  vm.editedTimeline = goalTimeline;
  // Clone the original goalTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(goalTimeline);
 };


 vm.doneEditing = function (goalTimeline) {
  vm.editedTimeline = null;
  goalTimeline.title = goalTimeline.title.trim();

  if (!goalTimeline.title) {
   vm.removeTimeline(goalTimeline);
  }
 };

 vm.openGoalTimeline = function (goalTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'goal-timeline-modal.html',
   controller: 'GoalTimelineCtrl as goalTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    goalTimelineData: function () {
     return goalTimeline;
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
 vm.goalTimelinesManager.getGoalTimelines(vm.goalId);
};

goalTimelinesCtrl.$inject = [
 'GoalTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.goal").controller('GoalTimelinesCtrl', goalTimelinesCtrl);
