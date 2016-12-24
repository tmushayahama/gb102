(function ()
{
 'use strict';

 angular
         .module('app.matcher')
         .controller('MatcherController', MatcherController);

 /** @ngInject */
 function MatcherController($stateParams, $scope, $rootScope, $mdSidenav)
 {
  var vm = this;

  $rootScope.appName = "Matcher App";

  $scope.$on('$stateChangeSuccess', function (event, toState) {
   $scope.selectedIndex = toState.data.selectedTab;
  });

 }
})();