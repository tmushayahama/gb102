var projectsAllCtrl = function (
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
 vm.projects = [];

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
  vm.projectsManager.getAllProjects().then(function (data) {
   vm.projects = data;
  });
 }


};

projectsAllCtrl.$inject = [
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

angular.module("app.project").controller('ProjectsAllCtrl', projectsAllCtrl);
