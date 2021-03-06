var explorerContributorCtrl = function (
        ExplorerContributorSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerContributorData) {
 var vm = this;
 vm.explorerId = explorerContributorData.explorer_id;
 vm.explorerContributorId = explorerContributorData.id;
 vm.explorerContributorSrv = new ExplorerContributorSrv();


 vm.contributorId = explorerContributorData.contributor_id;

 vm.contributorFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerContributorData = vm.defaultExplorerContributorData;

 vm.getExplorerContributor = function (explorerId, contributorId) {
  vm.explorerContributorSrv.getExplorerContributor(explorerId, contributorId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerContributor = function (data) {
  vm.explorerContributorSrv.editExplorerContributor(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerContributorSections = {
  details: function (details) {
   var explorerContributorData = {
    explorerContributorId: vm.explorerContributorId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerContributor(explorerContributorData);
  }
 }



 vm.showContributorForm = function () {
  vm.contributorFormDisplay = true;
 };



 //--------init------
 vm.getExplorerContributor(vm.explorerId, vm.contributorId);
};

explorerContributorCtrl.$inject = [
 'ExplorerContributorSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerContributorData'];

angular.module("app.explorer").controller('ExplorerContributorCtrl', explorerContributorCtrl);
