var teachsAllCtrl = function (
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
 vm.teachs = [];

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
  vm.teachsSrv.getAllTeachs().then(function (data) {
   vm.teachs = data;
  });
 }


};

teachsAllCtrl.$inject = [
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

angular.module("app.teach").controller('TeachsAllCtrl', teachsAllCtrl);
