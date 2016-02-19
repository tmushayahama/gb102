var goalProgressCtrl = function (
        GoalProgressManager,
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
 vm.goalProgressCopy;
 vm.goalProgressManager = new GoalProgressManager();
 vm.progressFormDisplay = false;

 vm.defaultGoalProgressData = {
  goalId: $stateParams.goalId,
  privacy: 0
 }
 vm.newGoalProgressData = angular.copy(vm.defaultGoalProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createGoalProgress = function (data) {
  vm.goalProgressManager.createGoalProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newGoalProgressData = angular.copy(vm.defaultGoalProgressData);
   vm.goalProgressCopy = angular.copy(vm.goalProgressManager.goalProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalProgress = function (data) {
  vm.goalProgressManager.editGoalProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newGoalProgressData = angular.copy(vm.defaultGoalProgressData);
   vm.goalProgressCopy = angular.copy(vm.goalProgressManager.goalProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalProgressSections = {
  details: function (goalProgressId, detail) {
   var goalProgressData = {
    goalProgressId: goalProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editGoalProgress(goalProgressData);
  }
 }

 vm.cancelGoalProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newGoalProgressData = angular.copy(vm.defaultGoalProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertGoalProgress = function (goalProgress, goalProgressCopy) {
  goalProgress = goalProgressCopy;
  /*
   $filter('filter')
   (vm.goalProgressManager.goalProgress, {id: goalProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.goalProgressCopy, {id: goalProgressId}, true)[0]);
   if (goalProgress.length && goalProgressCopy.length) {
   // vm.goalProgressManager.goalProgress angular.copy(vm.goalProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.goalProgress;
 }), function () {
  //vm.remainingCount = filterFilter(goalProgress, {completed: false}).length;
  vm.doneCount = vm.goalProgressManager.goalProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GoalProgressService.put(vm.goalProgress);
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




 vm.editProgress = function (goalProgress) {
  vm.editedProgress = goalProgress;
  // Clone the original goalProgress to restore it on demand.
  vm.originalProgress = angular.copy(goalProgress);
 };


 vm.doneEditing = function (goalProgress) {
  vm.editedProgress = null;
  goalProgress.title = goalProgress.title.trim();

  if (!goalProgress.title) {
   vm.removeProgress(goalProgress);
  }
 };

 vm.openGoalProgress = function (goalProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'goal-progress-modal.html',
   controller: 'GoalProgressCtrl as goalProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    goalProgressData: function () {
     return goalProgress;
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
 vm.goalProgressManager.getGoalProgress(vm.goalId);
};

goalProgressCtrl.$inject = [
 'GoalProgressManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.goal").controller('GoalProgressCtrl', goalProgressCtrl);
