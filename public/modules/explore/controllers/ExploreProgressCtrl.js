var exploreProgressCtrl = function (
        ExploreProgressManager,
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
 vm.exploreId = $stateParams.exploreId;
 vm.exploreProgressCopy;
 vm.exploreProgressManager = new ExploreProgressManager();
 vm.progressFormDisplay = false;

 vm.defaultExploreProgressData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 };

 vm.newExploreProgressData = angular.copy(vm.defaultExploreProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createExploreProgress = function (data) {
  vm.exploreProgressManager.createExploreProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newExploreProgressData = angular.copy(vm.defaultExploreProgressData);
   vm.exploreProgressCopy = angular.copy(vm.exploreProgressManager.exploreProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreProgress = function (data) {
  vm.exploreProgressManager.editExploreProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newExploreProgressData = angular.copy(vm.defaultExploreProgressData);
   vm.exploreProgressCopy = angular.copy(vm.exploreProgressManager.exploreProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreProgressSections = {
  details: function (exploreProgressId, detail) {
   var exploreProgressData = {
    exploreProgressId: exploreProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editExploreProgress(exploreProgressData);
  }
 };

 vm.cancelExploreProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newExploreProgressData = angular.copy(vm.defaultExploreProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.getExploreProgressPercentage = function (exploreProgressId) {
  return 30;
 };





 vm.editProgress = function (exploreProgress) {
  vm.editedProgress = exploreProgress;
  // Clone the original exploreProgress to restore it on demand.
  vm.originalProgress = angular.copy(exploreProgress);
 };


 vm.doneEditing = function (exploreProgress) {
  vm.editedProgress = null;
  exploreProgress.title = exploreProgress.title.trim();

  if (!exploreProgress.title) {
   vm.removeProgress(exploreProgress);
  }
 };


 vm.openExploreProgressItem = function (exploreProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explore-progress-item-modal.html',
   controller: 'ExploreProgressItemCtrl as exploreProgressItemCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    exploreProgressData: function () {
     return exploreProgress;
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
 vm.exploreProgressManager.getExploreProgress(vm.exploreId);
};

exploreProgressCtrl.$inject = [
 'ExploreProgressManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explore").controller('ExploreProgressCtrl', exploreProgressCtrl);
