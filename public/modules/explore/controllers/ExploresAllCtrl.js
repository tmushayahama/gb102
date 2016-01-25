var exploresAllCtrl = function (
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
 vm.explores = [];

 vm.exploresManager = new ExploresManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  vm.searchManager.simpleSearch($rootScope.searchSuggestions.selected).then(function (data) {
   vm.explores = data;
  });
 } else {
  vm.exploresManager.getAllExplores().then(function (data) {
   vm.explores = data;
  });
 }


};

exploresAllCtrl.$inject = [
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

angular.module("app.explore").controller('ExploresAllCtrl', exploresAllCtrl);
