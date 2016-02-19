var swipeProgressCtrl = function (
        SwipeProgressManager,
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
 vm.swipeId = $stateParams.swipeId;
 vm.swipeProgressCopy;
 vm.swipeProgressManager = new SwipeProgressManager();
 vm.progressFormDisplay = false;

 vm.defaultSwipeProgressData = {
  swipeId: $stateParams.swipeId,
  privacy: 0
 }
 vm.newSwipeProgressData = angular.copy(vm.defaultSwipeProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createSwipeProgress = function (data) {
  vm.swipeProgressManager.createSwipeProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newSwipeProgressData = angular.copy(vm.defaultSwipeProgressData);
   vm.swipeProgressCopy = angular.copy(vm.swipeProgressManager.swipeProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeProgress = function (data) {
  vm.swipeProgressManager.editSwipeProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newSwipeProgressData = angular.copy(vm.defaultSwipeProgressData);
   vm.swipeProgressCopy = angular.copy(vm.swipeProgressManager.swipeProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeProgressSections = {
  details: function (swipeProgressId, detail) {
   var swipeProgressData = {
    swipeProgressId: swipeProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editSwipeProgress(swipeProgressData);
  }
 }

 vm.cancelSwipeProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newSwipeProgressData = angular.copy(vm.defaultSwipeProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertSwipeProgress = function (swipeProgress, swipeProgressCopy) {
  swipeProgress = swipeProgressCopy;
  /*
   $filter('filter')
   (vm.swipeProgressManager.swipeProgress, {id: swipeProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.swipeProgressCopy, {id: swipeProgressId}, true)[0]);
   if (swipeProgress.length && swipeProgressCopy.length) {
   // vm.swipeProgressManager.swipeProgress angular.copy(vm.swipeProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.swipeProgress;
 }), function () {
  //vm.remainingCount = filterFilter(swipeProgress, {completed: false}).length;
  vm.doneCount = vm.swipeProgressManager.swipeProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SwipeProgressService.put(vm.swipeProgress);
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




 vm.editProgress = function (swipeProgress) {
  vm.editedProgress = swipeProgress;
  // Clone the original swipeProgress to restore it on demand.
  vm.originalProgress = angular.copy(swipeProgress);
 };


 vm.doneEditing = function (swipeProgress) {
  vm.editedProgress = null;
  swipeProgress.title = swipeProgress.title.trim();

  if (!swipeProgress.title) {
   vm.removeProgress(swipeProgress);
  }
 };

 vm.openSwipeProgress = function (swipeProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'swipe-progress-modal.html',
   controller: 'SwipeProgressCtrl as swipeProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    swipeProgressData: function () {
     return swipeProgress;
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
 vm.swipeProgressManager.getSwipeProgress(vm.swipeId);
};

swipeProgressCtrl.$inject = [
 'SwipeProgressManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipe").controller('SwipeProgressCtrl', swipeProgressCtrl);
