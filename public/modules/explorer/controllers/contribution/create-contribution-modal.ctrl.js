var createContributionCtrl = function (
        ConstantsSrv,
        CommunitySrv,
        ContributionsSrv,
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

 vm.explorerId = $stateParams.explorerId;
 vm.contributionType = contributionType;
 vm.communitySrv = new CommunitySrv();
 vm.contributionsSrv = new ContributionsSrv();
 vm.users = [];
 vm.selectedUsers = [];
 vm.getUsers = function () {
  vm.communitySrv.getUsers().then(function (data) {
   vm.users = data;
  });
 };

 vm.select = function () {
  vm.explorer.explorer_requests = [];
  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.explorer.explorer_requests.push(selectedRequestType.explorerRequest);
  });

  $uibModalInstance.close(vm.explorer);
 };

 vm.sendRequest = function (userId) {
  var requestData = {
   contributor_id: userId,
   level_id: vm.contributionType.id,
   description: "",
   explorer_id: vm.explorerId
  };
  vm.contributionsSrv.createContribution(requestData)
          .then(function (data) {
           vm.selectedUsers.push(data);
          });
 };

 vm.done = function () {
  $uibModalInstance.close(vm.selectedUsers);
 };

 vm.cancel = function () {
  $uibModalInstance.dismiss('cancel');
 };

 vm.getUsers();
};


createContributionCtrl.$inject = [
 'ConstantsSrv',
 'CommunitySrv',
 'ContributionsSrv',
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

angular.module("app.explorer").controller('CreateContributionCtrl', createContributionCtrl);
