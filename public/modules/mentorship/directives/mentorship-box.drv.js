angular.module('app.mentorship').directive('gbMentorshipBox',
        ['$q',
         function (
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/mentorship/views/templates/mentorship-box.tpl.html',
           scope: {
            mentorship: '=',
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

