angular.module('app.explorer').directive('gbExplorerBox',
        ['$rootScope',
         '$q',
         function (
                 $rootScope,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           scope: {
            templateUrl: '@',
            component: '=',
           },
           template: '<ng-include src="templateUrl"></ng-include>',
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {


            scope.style = {background: $rootScope.generateBackgroundPattern};
           }
          };
         }
        ]);

