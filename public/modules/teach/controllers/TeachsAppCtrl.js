var teachsAppCtrl = function (
        ConstantsSrv,
        TeachsSrv,
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

 $rootScope.appName = $stateParams.app_name;

 vm.teachsSrv = new TeachsSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.teachs = data;
  });
 } else {
  vm.teachsSrv.getAppTeachs($rootScope.appName).then(function (data) {
   vm.teachs = data;
  });
 }
};

teachsAppCtrl.$inject = [
 'ConstantsSrv',
 'TeachsSrv',
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

angular.module("app.teach").controller('TeachsAppCtrl', teachsAppCtrl);
