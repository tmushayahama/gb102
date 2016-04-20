var explorerActivitiesCtrl = function (
        ExplorerActivitiesSrv,
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
 vm.explorerId = $stateParams.explorerId;
 vm.explorerActivitiesCopy;
 vm.explorerActivitiesSrv = new ExplorerActivitiesSrv();
 vm.activityFormDisplay = false;

 vm.defaultExplorerActivityData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerActivityData = angular.copy(vm.defaultExplorerActivityData);

 vm.showActivityForm = function () {
  vm.activityFormDisplay = true;
 };

 vm.createExplorerActivity = function (data) {
  vm.explorerActivitiesSrv.createExplorerActivity(data).then(function (response) {
   vm.activityFormDisplay = false;
   vm.newExplorerActivityData = angular.copy(vm.defaultExplorerActivityData);
   vm.explorerActivitiesCopy = angular.copy(vm.explorerActivitiesSrv.explorerActivities);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerActivity = function (data) {
  vm.explorerActivitiesSrv.editExplorerActivity(data).then(function (response) {
   vm.activityFormDisplay = false;
   vm.newExplorerActivityData = angular.copy(vm.defaultExplorerActivityData);
   vm.explorerActivitiesCopy = angular.copy(vm.explorerActivitiesSrv.explorerActivities);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerActivitySections = {
  details: function (explorerActivityId, detail) {
   var explorerActivityData = {
    explorerActivityId: explorerActivityId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerActivity(explorerActivityData);
  }
 }

 vm.cancelExplorerActivity = function (form) {
  vm.activityFormDisplay = false;
  vm.newExplorerActivityData = angular.copy(vm.defaultExplorerActivityData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplorerActivity = function (explorerActivity, explorerActivityCopy) {
  explorerActivity = explorerActivityCopy;
  /*
   $filter('filter')
   (vm.explorerActivitiesSrv.explorerActivities, {id: explorerActivityId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerActivitiesCopy, {id: explorerActivityId}, true)[0]);
   if (explorerActivity.length && explorerActivityCopy.length) {
   // vm.explorerActivitiesSrv.explorerActivities angular.copy(vm.explorerActivitiesCopy);
   }
   */
 };






 vm.editedActivity = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerActivities;
 }), function () {
  //vm.remainingCount = filterFilter(explorerActivities, {completed: false}).length;
  vm.doneCount = vm.explorerActivitiesSrv.explorerActivities.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerActivityService.put(vm.explorerActivities);
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




 vm.editActivity = function (explorerActivity) {
  vm.editedActivity = explorerActivity;
  // Clone the original explorerActivity to restore it on demand.
  vm.originalActivity = angular.copy(explorerActivity);
 };


 vm.doneEditing = function (explorerActivity) {
  vm.editedActivity = null;
  explorerActivity.title = explorerActivity.title.trim();

  if (!explorerActivity.title) {
   vm.removeActivity(explorerActivity);
  }
 };

 vm.openExplorerActivity = function (explorerActivity) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-activity-modal.html',
   controller: 'ExplorerActivityCtrl as explorerActivityCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerActivityData: function () {
     return explorerActivity;
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
 vm.explorerActivitiesSrv.getExplorerActivities(vm.explorerId);
};


explorerActivitiesCtrl.$inject = [
 'ExplorerActivitiesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerActivitiesCtrl', explorerActivitiesCtrl);
