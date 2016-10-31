angular.module('app.explorer').directive('gbComponentBoxette',
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
           templateUrl: "public/modules/explorer/views/templates/component/component-boxette.tpl.html",
           scope: {
            //templateUrl: '@',
            componentId: '=',
            openComponent: '&',
           },
           controller: [
            '$scope',
            function ($scope) {

             //$scope.componentId = componentId;
             //$scope.componentBackgroundColors = appsConstants[level_categories.component_background_colors];
             $scope.componentsSrv = new ComponentsSrv();
             $scope.componentFormDisplay = false;
             $scope.componentSettingsDisplay = false;
             $scope.defaultComponentData = {
              explorerId: $scope.explorerId,
              typeId: level_categories.component.none,
              title: "",
              description: "",
              privacy: 0
             };

             $scope.getDefaultComponentData = function (parentComponentId) {
              var result = angular.copy($scope.defaultComponentData);
              if (parentComponentId) {
               result.parentComponentId = parentComponentId;
              }
              return result;
             };


             $scope.createComponent = function (parentComponent) {
              $scope.componentsSrv.createComponent(parentComponent.newComponentData).then(function (response) {

               parentComponent.components.push(response);
               parentComponent.newComponentData = $scope.getDefaultComponentData(parentComponent.newComponentData.parentComponentId);
              }, function (response) {
               console.log(response);
              });
             };

             $scope.getComponent = function (componentId, listFormat) {
              $scope.componentsSrv.getComponent(componentId, listFormat).then(function (response) {
               $scope.component = response;
               $scope.component.newComponentData = $scope.getDefaultComponentData();
              }, function (error) {
               console.log(error);
              });
             };

             $scope.editComponentDescription = function (data) {
              $scope.componentsSrv.editComponentDescription(data).then(function (response) {
               $scope.component.title = response.title;
               $scope.component.description = response.description;
               $scope.editDecriptionMode = false;
              }, function (response) {
               console.log(response);
              });
             };

             $scope.editComponentBackground = function (data) {
              $scope.componentsSrv.editComponentBackground(data).then(function (response) {
               $scope.component.background_color = response;
               $scope.component.background_color_id = response.id;
              }, function (response) {
               console.log(response);
              });
             };

             $scope.editComponentSections = {
              details: function () {
               var componentData = {
                componentId: $scope.component.id,
                title: $scope.component.title,
                description: $scope.component.description
               };
               $scope.editComponentDescription(componentData);
              },
              backgroundColor: function (backgroundColorId) {
               var componentData = {
                componentId: $scope.component.id,
                backgroundColorId: backgroundColorId
               };
               $scope.editComponentBackground(componentData);
              }
             };
             $scope.showComponentForm = function () {
              $scope.componentFormDisplay = true;
             };
             $scope.upGotoComponent = function (component, resultFormat) {

              $scope.componentsSrv.getComponents(component.parent_component_id, resultFormat).then(function (componentResponse) {
               $scope.componentsSrv.getComponent(component.parent_component_id, resultFormat).then(function (parentComponentResponse) {
                $scope.component = parentComponentResponse;
                $scope.component.components = componentResponse;
                $scope.component.newComponentData = $scope.getDefaultComponentData();
               }, function (error) {
                console.log(error);
               });
              });
             };

             //--------init------
             $scope.getComponent($scope.componentId, 2);

            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.open = function () {
             scope.openComponent({omponentId: scope.component.id});
            };
           }
          };
         }
        ]);