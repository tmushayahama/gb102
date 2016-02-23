var selectUsersCtrl = function (
        ConstantsManager,
        CommunityManager,
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
   user_id: userId,
   level_id: vm.contributorType.id,
   explore_id: vm.exploreId
  };
  vm.communityManager.sendRequest(requestData)
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
