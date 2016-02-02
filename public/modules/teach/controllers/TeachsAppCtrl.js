var teachsAppCtrl = function (
        ConstantsManager,
        TeachsManager,
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

 vm.teachsManager = new TeachsManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchManager.simpleSearch(searchData).then(function (data) {
   vm.teachs = data;
  });
 } else {
  vm.teachsManager.getAppTeachs(vm.appName).then(function (data) {
   vm.teachs = data;
  });
 }
};

teachsAppCtrl.$inject = [
 'ConstantsManager',
 'TeachsManager',
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

angular.module("app.teach").controller('TeachsAppCtrl', teachsAppCtrl);
