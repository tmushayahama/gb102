var swipeWeblinkCtrl = function (
        SwipeWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        swipeWeblinkData) {
 var vm = this;
 vm.swipeId = swipeWeblinkData.swipe_id;
 vm.swipeWeblinkId = swipeWeblinkData.id;
 vm.swipeWeblinkManager = new SwipeWeblinkManager();


 vm.weblinkId = swipeWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSwipeWeblinkData = vm.defaultSwipeWeblinkData;

 vm.getSwipeWeblink = function (swipeId, weblinkId) {
  vm.swipeWeblinkManager.getSwipeWeblink(swipeId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSwipeWeblink = function (data) {
  vm.swipeWeblinkManager.editSwipeWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeWeblinkSections = {
  details: function (details) {
   var swipeWeblinkData = {
    swipeWeblinkId: vm.swipeWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editSwipeWeblink(swipeWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getSwipeWeblink(vm.swipeId, vm.weblinkId);
};


swipeWeblinkCtrl.$inject = [
 'SwipeWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'swipeWeblinkData'];

angular.module("app.swipes").controller('SwipeWeblinkCtrl', swipeWeblinkCtrl);
