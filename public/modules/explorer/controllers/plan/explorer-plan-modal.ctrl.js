var explorerPlanCtrl = function (
        ExplorerPlanSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerPlanData) {
 var vm = this;
 vm.explorerId = explorerPlanData.explorer_id;
 vm.explorerPlanId = explorerPlanData.id;
 vm.explorerPlanSrv = new ExplorerPlanSrv();


 vm.planId = explorerPlanData.plan_id;

 vm.planFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerPlanData = vm.defaultExplorerPlanData;

 vm.getExplorerPlan = function (explorerId, planId) {
  vm.explorerPlanSrv.getExplorerPlan(explorerId, planId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerPlan = function (data) {
  vm.explorerPlanSrv.editExplorerPlan(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerPlanSections = {
  details: function (details) {
   var explorerPlanData = {
    explorerPlanId: vm.explorerPlanId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerPlan(explorerPlanData);
  }
 };



 vm.showPlanForm = function () {
  vm.planFormDisplay = true;
 };



 //--------init------
 vm.getExplorerPlan(vm.explorerId, vm.planId);
};


explorerPlanCtrl.$inject = [
 'ExplorerPlanSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerPlanData'];

angular.module("app.explorer").controller('ExplorerPlanCtrl', explorerPlanCtrl);