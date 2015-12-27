var goalTimelineCtrl = function (
        GoalTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        goalTimelineData) {
 var vm = this;
 vm.goalId = goalTimelineData.goal_id;
 vm.goalTimelineId = goalTimelineData.id;
 vm.goalTimelineManager = new GoalTimelineManager();


 vm.timelineId = goalTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGoalTimelineData = vm.defaultGoalTimelineData;

 vm.getGoalTimeline = function (goalId, timelineId) {
  vm.goalTimelineManager.getGoalTimeline(goalId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGoalTimeline = function (data) {
  vm.goalTimelineManager.editGoalTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalTimelineSections = {
  details: function (details) {
   var goalTimelineData = {
    goalTimelineId: vm.goalTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editGoalTimeline(goalTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getGoalTimeline(vm.goalId, vm.timelineId);
};


goalTimelineCtrl.$inject = [
 'GoalTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'goalTimelineData'];

angular.module("app.goals").controller('GoalTimelineCtrl', goalTimelineCtrl);
