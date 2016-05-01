var explorerGuidelineCtrl = function (
        ExplorerGuidelinesSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerGuidelineData) {
 var vm = this;
 vm.explorerId = explorerGuidelineData.explorer_id;
 vm.explorerGuidelineId = explorerGuidelineData.id;
 vm.explorerGuidelinesSrv = new ExplorerGuidelinesSrv();
 vm.explorerGuideline = explorerGuidelineData;
 vm.explorerSubGuidelines;
 vm.guidelineId = explorerGuidelineData.guideline_id;
 vm.guidelineFormDisplay = false;
 vm.ok = function () {
  $uibModalInstance.close();
 };
 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
 // vm.newExplorerGuidelineData = vm.defaultExplorerGuidelineData;

 vm.getExplorerGuideline = function (explorerId, guidelineId) {
  vm.explorerGuidelinesSrv.getExplorerGuideline(explorerId, guidelineId).then(function (response) {
   vm.explorerGuideline = response;
  }, function (error) {
   console.log(error);
  });
 };
 vm.getSubGuidelines = function (guidelineId) {
  vm.explorerGuidelinesSrv.getSubGuidelines(guidelineId).then(function (response) {
   vm.explorerSubGuidelines = response;

   angular.forEach(response, function (step, key) {
    vm.explorerGuidelinesSrv.getSubGuidelines(step.id).then(function (stepResponse) {
     vm.explorerSubGuidelines[key].steps = stepResponse;
    });
   });
  }, function (error) {
   console.log(error);
  });
 };
 vm.editExplorerGuideline = function (data) {
  vm.explorerGuidelinesSrv.editExplorerGuideline(data).then(function (response) {
   vm.editDecriptionMode = false;
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerGuidelineSections = {
  details: function () {
   var explorerGuidelineData = {
    explorerGuidelineId: vm.explorerGuideline.guideline.id,
    title: vm.explorerGuideline.guideline.title,
    description: vm.explorerGuideline.guideline.description
   };
   vm.editExplorerGuideline(explorerGuidelineData);
  }
 };
 vm.showGuidelineForm = function () {
  vm.guidelineFormDisplay = true;
 };
 //--------init------
 //vm.getExplorerGuideline(vm.explorerId, vm.guidelineId);
 vm.getSubGuidelines(vm.guidelineId);
};
explorerGuidelineCtrl.$inject = [
 'ExplorerGuidelinesSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerGuidelineData'];
angular.module("app.explorer").controller('ExplorerGuidelineCtrl', explorerGuidelineCtrl);
