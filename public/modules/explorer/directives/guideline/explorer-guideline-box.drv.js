angular.module('app.explorer').directive('gbExplorerGuidelineBox',
        ['ExplorerGuidelinesSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerGuidelinesSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/guideline/explorer-guideline-box.tpl.html',
           scope: {
            explorerGuideline: '=',
            openExplorerGuideline: '&',
           },
           controller: [
            '$scope',
            function ($scope) {
             $scope.stepsLimitTo = 8;
            }
           ],
           link: function (scope, element, attr, ctrl) {

            scope.open = function () {
             scope.openExplorerGuideline({explorerGuideline: scope.explorerGuideline});
            };
           }
          };
         }
        ]);

