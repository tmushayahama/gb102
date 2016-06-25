angular.module('app.explorer').directive('gbExplorerSectionBox',
        ['ExplorerSectionsSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerSectionsSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/section/explorer-section-box.tpl.html',
           scope: {
            explorerSection: '=',
            openExplorerSection: '&',
           },
           controller: [
            '$scope',
            function ($scope) {
             $scope.stepsLimitTo = 8;
            }
           ],
           link: function (scope, element, attr, ctrl) {

            scope.open = function () {
             scope.openExplorerSection({explorerSection: scope.explorerSection});
            };
           }
          };
         }
        ]);

