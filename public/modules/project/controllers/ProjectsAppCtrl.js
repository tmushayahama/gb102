var projectsAppCtrl = function (
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

 vm.appName = $stateParams.app_name;

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
  vm.projectsSrv.getAppProjects(vm.appName).then(function (data) {
   vm.projects = data;
  });
 }
};

projectsAppCtrl.$inject = [
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

angular.module("app.project").controller('ProjectsAppCtrl', projectsAppCtrl);
