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
           // template: '<ng-include src="componentTemplateUrl"/>',
           //replace: true,
           templateUrl: "public/modules/explorer/views/templates/component/explorer-component-box.tpl.html",
           scope: {
            //templateUrl: '@',
            explorerComponent: '=',
            openExplorerComponent: '&',
           },
           //template: '<div ng-include="\'/app/partials/HtmlPage.html\'"></div>',
           //template: "<ng-include src='templateUrl'></ng-include>",
           controller: [
            '$scope',
            function ($scope) {
             $scope.componentsLimitTo = 8;
             //$scope.getTemplateUrl = function () {
             /*
              $scope.$watch('explorerComponent.component.type_id', function (typeId)
              {
              //var typeId = $scope.explorerComponent.component.type_id;
              if (typeId === level_categories.component.note) {
              $scope.componentTemplateUrl = "public/modules/explorer/views/templates/note/component-note-box.tpl.html";
              } else if (typeId === level_categories.component.activity) {
              $scope.componentTemplateUrl = "public/modules/explorer/views/templates/activity/component-activity-box.tpl.html";
              } else if (typeId === level_categories.component.guideline) {
              $scope.componentTemplateUrl = "public/modules/explorer/views/templates/guideline/component-guideline-box.tpl.html";
              }

              });    */
             //};
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

