angular.module('app.explorer').directive('gbComponentMotiveBox',
        ['ComponentsSrv',
         'level_categories',
         '$q',
         function (
                 ComponentsSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           // template: '<ng-include src="componentTemplateUrl"/>',
           //replace: true,
           templateUrl: "public/modules/explorer/views/templates/component/component-motive-box.tpl.html",
           scope: {
            //templateUrl: '@',
            motiveNumber: '=',
            component: '=',
            getComponent: '&',
           },
           //template: '<div ng-include="\'/app/partials/HtmlPage.html\'"></div>',
           //template: "<ng-include src='templateUrl'></ng-include>",
           controller: [
            '$scope',
            function ($scope) {
             $scope.componentsLimitTo = 8;
             //$scope.getTemplateUrl = function () {
             /*
              $scope.$watch('component.component.type_id', function (typeId)
              {
              //var typeId = $scope.component.component.type_id;
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
             scope.getComponent();//({omponentId: scope.component.id});
            };
           }
          };
         }
        ]);

