var exploreProgressItemCtrl = function (
        ExploreProgressManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreProgressData) {
 var vm = this;
 vm.exploreId = exploreProgressData.explore_id;
 vm.exploreProgressId = exploreProgressData.id;
 vm.exploreProgressManager = new ExploreProgressManager();
 vm.exploreProgressItem;


 vm.progressId = exploreProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExploreProgressData = vm.defaultExploreProgressData;

 vm.getExploreProgress = function (exploreId, progressId) {
  vm.exploreProgressManager.getExploreProgressItem(exploreId, progressId).then(function (response) {
   vm.exploreProgressItem = response;
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExploreProgress = function (data) {
  vm.exploreProgressManager.editExploreProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreProgressSections = {
  details: function (details) {
   var exploreProgressData = {
    exploreProgressId: vm.exploreProgressId,
    title: details.title,
    description: details.description
   };
   vm.editExploreProgress(exploreProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getExploreProgress(vm.exploreId, vm.progressId);
};


exploreProgressItemCtrl.$inject = [
 'ExploreProgressManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreProgressData'];

angular.module("app.explore").controller('ExploreProgressItemCtrl', exploreProgressItemCtrl);
