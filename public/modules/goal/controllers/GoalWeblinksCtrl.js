var goalWeblinksCtrl = function (
        GoalWeblinksManager,
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
 vm.goalWeblinksCopy;
 vm.goalWeblinksManager = new GoalWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultGoalWeblinkData = {
  goalId: $stateParams.goalId,
  privacy: 0
 }
 vm.newGoalWeblinkData = angular.copy(vm.defaultGoalWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createGoalWeblink = function (data) {
  vm.goalWeblinksManager.createGoalWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newGoalWeblinkData = angular.copy(vm.defaultGoalWeblinkData);
   vm.goalWeblinksCopy = angular.copy(vm.goalWeblinksManager.goalWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalWeblink = function (data) {
  vm.goalWeblinksManager.editGoalWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newGoalWeblinkData = angular.copy(vm.defaultGoalWeblinkData);
   vm.goalWeblinksCopy = angular.copy(vm.goalWeblinksManager.goalWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalWeblinkSections = {
  details: function (goalWeblinkId, detail) {
   var goalWeblinkData = {
    goalWeblinkId: goalWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editGoalWeblink(goalWeblinkData);
  }
 }

 vm.cancelGoalWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newGoalWeblinkData = angular.copy(vm.defaultGoalWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertGoalWeblink = function (goalWeblink, goalWeblinkCopy) {
  goalWeblink = goalWeblinkCopy;
  /*
   $filter('filter')
   (vm.goalWeblinksManager.goalWeblinks, {id: goalWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.goalWeblinksCopy, {id: goalWeblinkId}, true)[0]);
   if (goalWeblink.length && goalWeblinkCopy.length) {
   // vm.goalWeblinksManager.goalWeblinks angular.copy(vm.goalWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.goalWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(goalWeblinks, {completed: false}).length;
  vm.doneCount = vm.goalWeblinksManager.goalWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GoalWeblinkService.put(vm.goalWeblinks);
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




 vm.editWeblink = function (goalWeblink) {
  vm.editedWeblink = goalWeblink;
  // Clone the original goalWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(goalWeblink);
 };


 vm.doneEditing = function (goalWeblink) {
  vm.editedWeblink = null;
  goalWeblink.title = goalWeblink.title.trim();

  if (!goalWeblink.title) {
   vm.removeWeblink(goalWeblink);
  }
 };

 vm.openGoalWeblink = function (goalWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'goal-weblink-modal.html',
   controller: 'GoalWeblinkCtrl as goalWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    goalWeblinkData: function () {
     return goalWeblink;
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
 vm.goalWeblinksManager.getGoalWeblinks(vm.goalId);
};

goalWeblinksCtrl.$inject = [
 'GoalWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.goal").controller('GoalWeblinksCtrl', goalWeblinksCtrl);
