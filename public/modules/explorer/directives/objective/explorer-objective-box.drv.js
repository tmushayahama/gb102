angular.module('app.explorer').directive('gbExplorerObjectiveBox',
        ['ExplorerObjectivesSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerObjectivesSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/objective/explorer-objective-box.tpl.html',
           scope: {
            explorerObjective: '=',
            openExplorerObjective: '&',
           },
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.open = function () {
             scope.openExplorerObjective({explorerObjective: scope.explorerObjective});
            };
           }
          };
         }
        ]);

