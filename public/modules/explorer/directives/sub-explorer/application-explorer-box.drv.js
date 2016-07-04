angular.module('app.explorer').directive('gbApplicationExplorerBox',
        ['$q',
         function (
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/sub-explorer/application-explorer-box.tpl.html',
           scope: {
            explorer: '=',
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

