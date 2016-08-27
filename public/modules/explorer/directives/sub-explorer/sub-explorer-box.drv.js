angular.module('app.explorer').directive('gbSubExplorerBox',
        ['$q',
         function (
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/sub-explorer/sub-explorer-box.tpl.html',
           scope: {
            explorer: '=',
           },
           controller: [
            '$scope',
            function ($scope) {
             $scope.stepsLimitTo = 5;
            }
           ],
           link: function (scope, element, attr, ctrl) {

           }
          };
         }
        ]);

