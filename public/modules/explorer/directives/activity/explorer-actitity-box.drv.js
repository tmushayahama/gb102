angular.module('app.explorer').directive('gbExplorerNoteBox',
        ['ExplorerNotesSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerNotesSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/note/explorer-note-box.tpl.html',
           scope: {
            explorerNote: '=',
            openExplorerNote: '&',
           },
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.open = function () {
             scope.openExplorerNote({explorerNote: scope.explorerNote});
            };
           }
          };
         }
        ]);

