var selectUsersCtrl = function (
        ConstantsManager,
        CommunityManager,
        ExploreContributionsManager,
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
        contributionType) {
 var vm = this;

 vm.exploreId = $stateParams.exploreId;
 vm.contributionType = contributionType;
 vm.communityManager = new CommunityManager();
 vm.exploreContributionsManager = new ExploreContributionsManager();
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
   level_id: vm.contributionType.id,
   description: "",
   explore_id: vm.exploreId
  };
  vm.exploreContributionsManager.createExploreContribution(requestData)
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
 'ExploreContributionsManager',
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
 'contributionType'];

angular.module("app.explore").controller('SelectUsersCtrl', selectUsersCtrl);
