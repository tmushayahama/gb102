angular.module('app.explorer').directive('gbComponentActivityBox',
        ['level_categories',
         '$q',
         function (
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/activity/component-activity-box.tpl.html',
           scope: {
            component: '=',
            openExplorerActivity: '&',
           },
           controller: [
            '$scope',
            function ($scope) {
             $scope.stepsLimitTo = 6;
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

