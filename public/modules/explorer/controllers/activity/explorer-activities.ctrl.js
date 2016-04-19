var explorerActivitysCtrl = function (
        ExplorerActivitysSrv,
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
 vm.explorerActivitysCopy;
 vm.explorerActivitysSrv = new ExplorerActivitysSrv();
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
  vm.explorerActivitysSrv.createExplorerActivity(data).then(function (response) {
   vm.activityFormDisplay = false;
   vm.newExplorerActivityData = angular.copy(vm.defaultExplorerActivityData);
   vm.explorerActivitysCopy = angular.copy(vm.explorerActivitysSrv.explorerActivitys);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerActivity = function (data) {
  vm.explorerActivitysSrv.editExplorerActivity(data).then(function (response) {
   vm.activityFormDisplay = false;
   vm.newExplorerActivityData = angular.copy(vm.defaultExplorerActivityData);
   vm.explorerActivitysCopy = angular.copy(vm.explorerActivitysSrv.explorerActivitys);
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
   (vm.explorerActivitysSrv.explorerActivitys, {id: explorerActivityId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerActivitysCopy, {id: explorerActivityId}, true)[0]);
   if (explorerActivity.length && explorerActivityCopy.length) {
   // vm.explorerActivitysSrv.explorerActivitys angular.copy(vm.explorerActivitysCopy);
   }
   */
 };






 vm.editedActivity = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerActivitys;
 }), function () {
  //vm.remainingCount = filterFilter(explorerActivitys, {completed: false}).length;
  vm.doneCount = vm.explorerActivitysSrv.explorerActivitys.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerActivityService.put(vm.explorerActivitys);
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
 vm.explorerActivitysSrv.getExplorerActivitys(vm.explorerId);
};


explorerActivitysCtrl.$inject = [
 'ExplorerActivitysSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerActivitysCtrl', explorerActivitysCtrl);
