var createExplorerContributionCtrl = function (
        ConstantsSrv,
        CommunitySrv,
        ExplorerContributionsSrv,
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
 vm.explorerContributionsSrv = new ExplorerContributionsSrv();
 vm.users;
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
  vm.explorerContributionsSrv.createExplorerContribution(requestData)
          .then(function (data) {

          });
 };

 vm.cancel = function () {
  $uibModalInstance.dismiss('cancel');
 };

 vm.getUsers();
};


createExplorerContributionCtrl.$inject = [
 'ConstantsSrv',
 'CommunitySrv',
 'ExplorerContributionsSrv',
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

angular.module("app.explorer").controller('CreateExplorerContributionCtrl', createExplorerContributionCtrl);
