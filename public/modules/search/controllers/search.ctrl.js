var searchCtrl = function (
        level_categories,
        ConstantsSrv,
        SearchSrv,
        $scope,
        $timeout,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-search.css'
 }, $scope);

 var vm = this;
 $rootScope.appName = 'SEARCH';


 vm.constantsSrv = new ConstantsSrv();
 vm.currentExplorer;
 vm.searchLevels;



 vm.getSearch = function () {
  vm.searchSrv.getSearch().then(function (response) {
   vm.currentExplorer = response;
  });
 };

 vm.createSearch = function (explorerId, levelId) {
  var data = {
   explorerId: explorerId,
   levelId: levelId,
   description: ""
  };
  vm.searchSrv.createSearch(data).then(function (response) {
   //vm.currentExplorer = response;
  });
  vm.getSearch();
 };

 vm.viewSearch = function () {
  vm.searchSrv.getSearchs();
 };

 vm.searchSrv = new SearchSrv();
 vm.constantsSrv.getLevel(11).then(function (data) {
  vm.searchLevels = data;
 });

};


searchCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SearchSrv',
 '$scope',
 '$timeout',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.search").controller('SearchCtrl', searchCtrl);
