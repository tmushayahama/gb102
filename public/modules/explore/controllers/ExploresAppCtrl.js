var exploresAppCtrl = function (
        ConstantsManager,
        ExploresManager,
        SearchManager,
        isSearch,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;

 vm.appName = $stateParams.app_name;

 vm.exploresManager = new ExploresManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  vm.searchManager.simpleSearch($rootScope.searchParams).then(function (data) {
   vm.explores = data;
  });
 } else {
  vm.exploresManager.getAppExplores(vm.appName).then(function (data) {
   vm.explores = data;
  });
 }
};

exploresAppCtrl.$inject = [
 'ConstantsManager',
 'ExploresManager',
 'SearchManager',
 'isSearch',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explore").controller('ExploresAppCtrl', exploresAppCtrl);
