var exploreContributorCtrl = function (
        ExploreContributorManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreContributorData) {
 var vm = this;
 vm.exploreId = exploreContributorData.explore_id;
 vm.exploreContributorId = exploreContributorData.id;
 vm.exploreContributorManager = new ExploreContributorManager();


 vm.contributorId = exploreContributorData.contributor_id;

 vm.contributorFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExploreContributorData = vm.defaultExploreContributorData;

 vm.getExploreContributor = function (exploreId, contributorId) {
  vm.exploreContributorManager.getExploreContributor(exploreId, contributorId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExploreContributor = function (data) {
  vm.exploreContributorManager.editExploreContributor(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreContributorSections = {
  details: function (details) {
   var exploreContributorData = {
    exploreContributorId: vm.exploreContributorId,
    title: details.title,
    description: details.description
   };
   vm.editExploreContributor(exploreContributorData);
  }
 }



 vm.showContributorForm = function () {
  vm.contributorFormDisplay = true;
 };



 //--------init------
 vm.getExploreContributor(vm.exploreId, vm.contributorId);
};

exploreContributorCtrl.$inject = [
 'ExploreContributorManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreContributorData'];

angular.module("app.explore").controller('ExploreContributorCtrl', exploreContributorCtrl);
