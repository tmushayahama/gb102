var explorerWeblinkCtrl = function (
        ExplorerWeblinkSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerWeblinkData) {
 var vm = this;
 vm.explorerId = explorerWeblinkData.explorer_id;
 vm.explorerWeblinkId = explorerWeblinkData.id;
 vm.explorerWeblinkSrv = new ExplorerWeblinkSrv();


 vm.weblinkId = explorerWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerWeblinkData = vm.defaultExplorerWeblinkData;

 vm.getExplorerWeblink = function (explorerId, weblinkId) {
  vm.explorerWeblinkSrv.getExplorerWeblink(explorerId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerWeblink = function (data) {
  vm.explorerWeblinkSrv.editExplorerWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerWeblinkSections = {
  details: function (details) {
   var explorerWeblinkData = {
    explorerWeblinkId: vm.explorerWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerWeblink(explorerWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getExplorerWeblink(vm.explorerId, vm.weblinkId);
};


explorerWeblinkCtrl.$inject = [
 'ExplorerWeblinkSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerWeblinkData'];

angular.module("app.explorer").controller('ExplorerWeblinkCtrl', explorerWeblinkCtrl);