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
           templateUrl: "public/modules/explorer/views/templates/activity/component-activity-box.tpl.html",
           scope: {
            templateUrl: '@',
            explorerComponent: '=',
            openExplorerComponent: '&',
           },
           // template: "<div ng-include='templateUrl'></div>",
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

