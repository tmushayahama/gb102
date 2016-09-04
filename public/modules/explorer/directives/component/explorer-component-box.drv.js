angular.module('app.explorer').directive('gbExplorerComponentBox',
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
           //templateUrl: "public/modules/explorer/views/templates/activity/component-activity-box.tpl.html",
           scope: {
            //templateUrl: '@',
            explorerComponent: '=',
            openExplorerComponent: '&',
           },
           template: '<ng-include src="getTemplateUrl()"/>',
           //template: '<div ng-include="\'/app/partials/HtmlPage.html\'"></div>',
           // template: "<div ng-include='templateUrl'></div>",
           controller: [
            '$scope',
            function ($scope) {
             $scope.componentsLimitTo = 8;
             $scope.getTemplateUrl = function () {
              switch ($scope.explorerComponent.component.type_id) {
               case level_categories.component.note:
                return "public/modules/explorer/views/templates/note/component-note-box.tpl.html";
               case level_categories.component.activity:
                return "public/modules/explorer/views/templates/activity/component-activity-box.tpl.html";
               case level_categories.component.guideline:
                return "public/modules/explorer/views/templates/guideline/component-guideline-box.tpl.html";
              }
             }
            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.open = function () {
             scope.openExplorerComponent({explorerComponent: scope.explorerComponent});
            };
           }
          };
         }
        ]);

