angular.module('app.explorer').directive('gbExplorerBox',
        ['$q',
         function (
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           scope: {
            templateUrl: '@',
            explorer: '=',
           },
           template: '<ng-include src="templateUrl"></ng-include>',
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {

           }
          };
         }
        ]);

