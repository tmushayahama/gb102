var explorersAppCtrl = function (
        ConstantsSrv,
        ComponentsSrv,
        SearchSrv,
        listType,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 var vm = this;

 $rootScope.appName = $stateParams.app_name;

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-' + $rootScope.appName + '.css'
 }, $scope);

 $rootScope.subAppName = $rootScope.appName.toUpperCase();

 vm.componentsSrv = new ComponentsSrv();


 switch (listType) {
  case 1:
   vm.componentsSrv.getComponentsByType($rootScope.appName, 1).then(function (response) {
    vm.components = response;
   }, function (error) {
    console.log(error);
   });
   break;
  case 2:
   vm.userId = $stateParams.profileId;
   vm.componentsSrv.getUserAppExplorers(vm.userId, $rootScope.appName).then(function (data) {
    vm.explorers = data;
   });
   break;
  case 3:
   vm.searchSrv = new SearchSrv();
   var searchData = {
    query: $rootScope.searchKeyword
   };
   vm.searchSrv.simpleSearch(searchData).then(function (data) {
    vm.explorers = data;
   });
   break;
 }

};

explorersAppCtrl.$inject = [
 'ConstantsSrv',
 'ComponentsSrv',
 'SearchSrv',
 'listType',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.explorer").controller('ExplorersAppCtrl', explorersAppCtrl);
