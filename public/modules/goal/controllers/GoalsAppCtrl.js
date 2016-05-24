var goalsAppCtrl = function (
        ConstantsSrv,
        GoalsSrv,
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

 vm.goalsSrv = new GoalsSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.goals = data;
  });
 } else {
  vm.goalsSrv.getAppGoals($rootScope.appName).then(function (data) {
   vm.goals = data;
  });
 }
};

goalsAppCtrl.$inject = [
 'ConstantsSrv',
 'GoalsSrv',
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

angular.module("app.goal").controller('GoalsAppCtrl', goalsAppCtrl);
