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
        modalData) {
 var vm = this;

 vm.modalData = modalData;
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
 'modalData'];

angular.module("app.explore").controller('SelectUsersCtrl', selectUsersCtrl);
