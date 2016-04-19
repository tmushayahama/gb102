angular.module('app.explorer').directive('gbExplorerExerciseBox',
        ['ExplorerExercisesSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerExercisesSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/exercise/explorer-exercise-box.tpl.html',
           scope: {
            explorerExercise: '=',
            openExplorerExercise: '&',
           },
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.open = function () {
             scope.openExplorerExercise({explorerExercise: scope.explorerExercise});
            };
           }
          };
         }
        ]);

