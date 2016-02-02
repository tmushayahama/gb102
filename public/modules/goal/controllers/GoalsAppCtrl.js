var goalsAppCtrl = function (
        ConstantsManager,
        GoalsManager,
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

 vm.goalsManager = new GoalsManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchManager.simpleSearch(searchData).then(function (data) {
   vm.goals = data;
  });
 } else {
  vm.goalsManager.getAppGoals(vm.appName).then(function (data) {
   vm.goals = data;
  });
 }
};

goalsAppCtrl.$inject = [
 'ConstantsManager',
 'GoalsManager',
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

angular.module("app.goal").controller('GoalsAppCtrl', goalsAppCtrl);
