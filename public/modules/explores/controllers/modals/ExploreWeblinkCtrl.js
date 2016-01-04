var exploreWeblinkCtrl = function (
        ExploreWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreWeblinkData) {
 var vm = this;
 vm.exploreId = exploreWeblinkData.explore_id;
 vm.exploreWeblinkId = exploreWeblinkData.id;
 vm.exploreWeblinkManager = new ExploreWeblinkManager();


 vm.weblinkId = exploreWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExploreWeblinkData = vm.defaultExploreWeblinkData;

 vm.getExploreWeblink = function (exploreId, weblinkId) {
  vm.exploreWeblinkManager.getExploreWeblink(exploreId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExploreWeblink = function (data) {
  vm.exploreWeblinkManager.editExploreWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreWeblinkSections = {
  details: function (details) {
   var exploreWeblinkData = {
    exploreWeblinkId: vm.exploreWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editExploreWeblink(exploreWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getExploreWeblink(vm.exploreId, vm.weblinkId);
};


exploreWeblinkCtrl.$inject = [
 'ExploreWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreWeblinkData'];

angular.module("app.explores").controller('ExploreWeblinkCtrl', exploreWeblinkCtrl);
