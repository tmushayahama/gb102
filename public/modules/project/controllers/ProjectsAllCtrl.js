var projectsAllCtrl = function (
        ConstantsSrv,
        ProjectsSrv,
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
 vm.projects = [];

 vm.projectsSrv = new ProjectsSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.projects = data;
  });
 } else {
  vm.projectsSrv.getAllProjects().then(function (data) {
   vm.projects = data;
  });
 }


};

projectsAllCtrl.$inject = [
 'ConstantsSrv',
 'ProjectsSrv',
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

angular.module("app.project").controller('ProjectsAllCtrl', projectsAllCtrl);
