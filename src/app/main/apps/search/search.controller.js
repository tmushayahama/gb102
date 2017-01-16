(function ()
{
 'use strict';

 angular
         .module('app.search')
         .controller('SearchController', SearchController);

 /** @ngInject */
 function SearchController($stateParams, $scope, $rootScope, $mdSidenav)
 {
  var vm = this;

  $rootScope.appName = "Search App";

  $scope.$on('$stateChangeSuccess', function (event, toState) {
   $scope.selectedIndex = toState.data.selectedTab;
  });

 }
})();