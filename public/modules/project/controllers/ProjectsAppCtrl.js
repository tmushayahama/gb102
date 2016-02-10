var projectsAppCtrl = function (
        ConstantsManager,
        ProjectsManager,
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

 vm.projectsManager = new ProjectsManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchManager.simpleSearch(searchData).then(function (data) {
   vm.projects = data;
  });
 } else {
  vm.projectsManager.getAppProjects(vm.appName).then(function (data) {
   vm.projects = data;
  });
 }
};

projectsAppCtrl.$inject = [
 'ConstantsManager',
 'ProjectsManager',
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

angular.module("app.project").controller('ProjectsAppCtrl', projectsAppCtrl);
