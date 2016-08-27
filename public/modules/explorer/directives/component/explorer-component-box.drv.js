angular.module('app.explorer').directive('gbExplorerComponentBox',
        ['ExplorerComponentsSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerComponentsSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           scope: {
            templateUrl: '@',
            explorerComponent: '=',
            openExplorerComponent: '&',
           },
           template: '<ng-include src="templateUrl"></ng-include>',
           controller: [
            '$scope',
            function ($scope) {
             $scope.stepsLimitTo = 8;
            }
           ],
           link: function (scope, element, attr, ctrl) {

            scope.open = function () {
             scope.openExplorerComponent({explorerComponent: scope.explorerComponent});
            };
           }
          };
         }
        ]);

