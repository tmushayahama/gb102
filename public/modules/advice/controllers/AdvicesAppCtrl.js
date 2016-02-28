var advicesAppCtrl = function (
        ConstantsSrv,
        AdvicesSrv,
        SearchSrv,
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

 vm.advicesSrv = new AdvicesSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.advices = data;
  });
 } else {
  vm.advicesSrv.getAppAdvices(vm.appName).then(function (data) {
   vm.advices = data;
  });
 }
};

advicesAppCtrl.$inject = [
 'ConstantsSrv',
 'AdvicesSrv',
 'SearchSrv',
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

angular.module("app.advice").controller('AdvicesAppCtrl', advicesAppCtrl);
