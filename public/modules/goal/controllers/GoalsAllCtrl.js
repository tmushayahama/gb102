var goalsAllCtrl = function (
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
 vm.goals = [];

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
  vm.goalsSrv.getAllGoals().then(function (data) {
   vm.goals = data;
  });
 }


};

goalsAllCtrl.$inject = [
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

angular.module("app.goal").controller('GoalsAllCtrl', goalsAllCtrl);
