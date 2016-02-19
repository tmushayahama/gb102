var swipeProgressCtrl = function (
        SwipeProgressManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        swipeProgressData) {
 var vm = this;
 vm.swipeId = swipeProgressData.swipe_id;
 vm.swipeProgressId = swipeProgressData.id;
 vm.swipeProgressManager = new SwipeProgressManager();


 vm.progressId = swipeProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSwipeProgressData = vm.defaultSwipeProgressData;

 vm.getSwipeProgress = function (swipeId, progressId) {
  vm.swipeProgressManager.getSwipeProgress(swipeId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSwipeProgress = function (data) {
  vm.swipeProgressManager.editSwipeProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeProgressSections = {
  details: function (details) {
   var swipeProgressData = {
    swipeProgressId: vm.swipeProgressId,
    title: details.title,
    description: details.description
   };
   vm.editSwipeProgress(swipeProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getSwipeProgress(vm.swipeId, vm.progressId);
};


swipeProgressCtrl.$inject = [
 'SwipeProgressManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'swipeProgressData'];

angular.module("app.swipe").controller('SwipeProgressCtrl', swipeProgressCtrl);
