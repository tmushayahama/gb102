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
            addToExplorerSection: '=',
           },
           controller: [
            '$scope',
            function ($scope) {
             $scope.stepsLimitTo = 8;
             $scope.newAnswer = "";
             $scope.add = function () {
              var data = {
               explorer_id: $scope.explorerSection.explorer_id,
               question_id: $scope.explorerSection.id,
               description: $scope.newAnswer
              };
              $scope.addToExplorerSection(data).then(function (response) {
               $scope.explorerSection.answers.unshift(response);
               $scope.newAnswer = "";
              });
             };
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

