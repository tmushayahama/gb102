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
           },
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.open = function () {
             scope.openExplorerPlan({explorerPlan: scope.explorerPlan});
            };
           }
          };
         }
        ]);

