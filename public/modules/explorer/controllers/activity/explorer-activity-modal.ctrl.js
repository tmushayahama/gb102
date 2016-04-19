var explorerActivityCtrl = function (
        ExplorerActivitySrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerActivityData) {
 var vm = this;
 vm.explorerId = explorerActivityData.explorer_id;
 vm.explorerActivityId = explorerActivityData.id;
 vm.explorerActivitySrv = new ExplorerActivitySrv();


 vm.activityId = explorerActivityData.activity_id;

 vm.activityFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerActivityData = vm.defaultExplorerActivityData;

 vm.getExplorerActivity = function (explorerId, activityId) {
  vm.explorerActivitySrv.getExplorerActivity(explorerId, activityId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerActivity = function (data) {
  vm.explorerActivitySrv.editExplorerActivity(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerActivitySections = {
  details: function (details) {
   var explorerActivityData = {
    explorerActivityId: vm.explorerActivityId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerActivity(explorerActivityData);
  }
 };



 vm.showActivityForm = function () {
  vm.activityFormDisplay = true;
 };



 //--------init------
 vm.getExplorerActivity(vm.explorerId, vm.activityId);
};


explorerActivityCtrl.$inject = [
 'ExplorerActivitySrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerActivityData'];

angular.module("app.explorer").controller('ExplorerActivityCtrl', explorerActivityCtrl);
