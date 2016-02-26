var selectUsersCtrl = function (
        ConstantsManager,
        CommunityManager,
        ExploreContributorsManager,
        level_categories,
        $uibModalInstance,
        WizardHandler,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        contributorType) {
 var vm = this;

 vm.exploreId = $stateParams.exploreId;
 vm.contributorType = contributorType;
 vm.communityManager = new CommunityManager();
 vm.exploreContributorsManager = new ExploreContributorsManager();
 vm.users;
 vm.getUsers = function () {
  vm.communityManager.getUsers().then(function (data) {
   vm.users = data;
  });
 };

 vm.select = function () {
  vm.explore.explore_requests = [];
  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.explore.explore_requests.push(selectedRequestType.exploreRequest);
  });

  $uibModalInstance.close(vm.explore);
 };

 vm.sendRequest = function (userId) {
  var requestData = {
   contributor_id: userId,
   level_id: vm.contributorType.id,
   description: "",
   explore_id: vm.exploreId
  };
  vm.exploreContributorsManager.createExploreContributor(requestData)
          .then(function (data) {

          });
 };

 vm.cancel = function () {
  $uibModalInstance.dismiss('cancel');
 };

 vm.getUsers();
};


selectUsersCtrl.$inject = [
 'ConstantsManager',
 'CommunityManager',
 'ExploreContributorsManager',
 'level_categories',
 '$uibModalInstance',
 'WizardHandler',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'contributorType'];

angular.module("app.explore").controller('SelectUsersCtrl', selectUsersCtrl);
