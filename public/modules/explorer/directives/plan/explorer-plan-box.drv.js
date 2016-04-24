angular.module('app.explorer').directive('gbExplorerPlanBox',
        ['ExplorerPlansSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerPlansSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/plan/explorer-plan-box.tpl.html',
           scope: {
            explorerPlan: '=',
            openExplorerPlan: '&',
            index: '@'
           },
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.number = parseInt(scope.index) + 1;
            scope.open = function () {
             scope.openExplorerPlan({explorerPlan: scope.explorerPlan});
            };
           }
          };
         }
        ]);

