angular.module('app.explorer').directive('gbExplorerNoteBox',
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
           // templateUrl: 'public/modules/explorer/views/templates/note/explorer-note-box.tpl.html',
           scope: {
            explorerNote: '=',
            openExplorerNote: '&',
           },
           controller: [
            '$scope',
            function ($scope) {
             $scope.componentsLimitTo = 8;
             $scope.getTemplateUrl = function () {
              var typeId = $scope.explorerNote.component.type_id;
              if (typeId === level_categories.component.note) {
               return "public/modules/explorer/views/templates/note/component-note-box.tpl.html";
              } else if (typeId === level_categories.component.activity) {
               return "public/modules/explorer/views/templates/activity/component-activity-box.tpl.html";
              } else if (typeId === level_categories.component.guideline) {
               return "public/modules/explorer/views/templates/guideline/component-guideline-box.tpl.html";
              }
             };
            }
           ],
           template: '<ng-include src="getTemplateUrl()"/>',
           link: function (scope, element, attr, ctrl) {
            scope.open = function () {
             scope.openExplorerNote({explorerNote: scope.explorerNote});
            };
           }
          };
         }
        ]);

