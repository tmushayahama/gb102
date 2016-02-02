var goalsAllCtrl = function (
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
 vm.goals = [];

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
  vm.goalsManager.getAllGoals().then(function (data) {
   vm.goals = data;
  });
 }


};

goalsAllCtrl.$inject = [
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

angular.module("app.goal").controller('GoalsAllCtrl', goalsAllCtrl);
