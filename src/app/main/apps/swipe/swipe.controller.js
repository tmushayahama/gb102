(function ()
{
 'use strict';

 angular
         .module('app.swipe')
         .controller('SwipeController', SwipeController);

 /** @ngInject */
 function SwipeController($stateParams, $scope, $rootScope, $mdSidenav)
 {
  var vm = this;

  $rootScope.appName = "Swipe App";

  $scope.$on('$stateChangeSuccess', function (event, toState) {
   $scope.selectedIndex = toState.data.selectedTab;
  });

 }
})();