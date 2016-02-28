var goalWeblinkCtrl = function (
        GoalWeblinkSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        goalWeblinkData) {
 var vm = this;
 vm.goalId = goalWeblinkData.goal_id;
 vm.goalWeblinkId = goalWeblinkData.id;
 vm.goalWeblinkSrv = new GoalWeblinkSrv();


 vm.weblinkId = goalWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGoalWeblinkData = vm.defaultGoalWeblinkData;

 vm.getGoalWeblink = function (goalId, weblinkId) {
  vm.goalWeblinkSrv.getGoalWeblink(goalId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGoalWeblink = function (data) {
  vm.goalWeblinkSrv.editGoalWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalWeblinkSections = {
  details: function (details) {
   var goalWeblinkData = {
    goalWeblinkId: vm.goalWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editGoalWeblink(goalWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getGoalWeblink(vm.goalId, vm.weblinkId);
};


goalWeblinkCtrl.$inject = [
 'GoalWeblinkSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'goalWeblinkData'];

angular.module("app.goal").controller('GoalWeblinkCtrl', goalWeblinkCtrl);
