var goalProgressCtrl = function (
        GoalProgressManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        goalProgressData) {
 var vm = this;
 vm.goalId = goalProgressData.goal_id;
 vm.goalProgressId = goalProgressData.id;
 vm.goalProgressManager = new GoalProgressManager();


 vm.progressId = goalProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGoalProgressData = vm.defaultGoalProgressData;

 vm.getGoalProgress = function (goalId, progressId) {
  vm.goalProgressManager.getGoalProgress(goalId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGoalProgress = function (data) {
  vm.goalProgressManager.editGoalProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalProgressSections = {
  details: function (details) {
   var goalProgressData = {
    goalProgressId: vm.goalProgressId,
    title: details.title,
    description: details.description
   };
   vm.editGoalProgress(goalProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getGoalProgress(vm.goalId, vm.progressId);
};


goalProgressCtrl.$inject = [
 'GoalProgressManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'goalProgressData'];

angular.module("app.goal").controller('GoalProgressCtrl', goalProgressCtrl);
