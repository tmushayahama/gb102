angular.module('app.explorer').directive('gbExplorerBox2',
        ['$q',
         function (
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/explorer-box-2.tpl.html',
           scope: {
            explorer: '=',
            boxNumber: '=',
           },
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {

           }
          };
         }
        ]);

