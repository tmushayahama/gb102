angular.module('app.explorer').directive('gbExplorerActivityBox',
        ['ExplorerActivitiesSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerActivitiesSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/activity/explorer-activity-box.tpl.html',
           scope: {
            explorerActivity: '=',
            openExplorerActivity: '&',
           },
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.open = function () {
             scope.openExplorerActivity({explorerActivity: scope.explorerActivity});
            };
           }
          };
         }
        ]);

