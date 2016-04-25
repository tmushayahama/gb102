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
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerGuideline = function (data) {
  vm.explorerGuidelinesSrv.editExplorerGuideline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerGuidelineSections = {
  details: function (details) {
   var explorerGuidelineData = {
    explorerGuidelineId: vm.explorerGuidelineId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerGuideline(explorerGuidelineData);
  }
 };



 vm.showGuidelineForm = function () {
  vm.guidelineFormDisplay = true;
 };



 //--------init------
 vm.getExplorerGuideline(vm.explorerId, vm.guidelineId);
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
