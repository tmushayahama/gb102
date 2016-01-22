var searchCtrl = function (
        level_categories,
        ConstantsManager,
        SearchManager,
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



 vm.constantsManager = new ConstantsManager();
 vm.currentExplore;
 vm.searchLevels;



 vm.getSearch = function () {
  vm.searchManager.getSearch().then(function (response) {
   vm.currentExplore = response;
  });
 };

 vm.createSearch = function (exploreId, levelId) {
  var data = {
   exploreId: exploreId,
   levelId: levelId,
   description: ""
  };
  vm.searchManager.createSearch(data).then(function (response) {
   //vm.currentExplore = response;
  });
  vm.getSearch();
 };

 vm.viewSearch = function () {
  vm.searchManager.getSearchs();
 };

 vm.searchManager = new SearchManager();
 vm.constantsManager.getLevel(11).then(function (data) {
  vm.searchLevels = data;
 });

};


searchCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SearchManager',
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
