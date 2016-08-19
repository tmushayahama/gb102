angular.module('app.explorer').directive('gbExplorerBox',
        ['$q',
         function (
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           scope: {
            templateUrl: '@',
            explorer: '=',
           },
           template: '<ng-include src="templateUrl"></ng-include>',
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {

            function getRandom(min, max) {
             if (min > max) {
              return -1;
             }

             if (min == max) {
              return min;
             }

             var r;

             do {
              r = Math.random();
             } while (r == 1.0);

             return min + parseInt(r * (max - min + 1));
            }

            function checkBrowserName(name) {
             var agent = navigator.userAgent.toLowerCase();
             if (agent.indexOf(name.toLowerCase()) > -1) {
              return true;
             }
             return false;
            }

            if (checkBrowserName('safari')) {
             var rot = getRandom(0, 255);
             var blau = getRandom(0, 255);
             var gruen = getRandom(0, 255);
             var rot_zwei = getRandom(0, rot);
             var blau_zwei = getRandom(0, blau);
             var gruen_zwei = getRandom(0, gruen);
             var transparent = getRandom(2, 5);
             var alles = '-webkit-linear-gradient(rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') 0%, rgba(' + rot_zwei + ',' + blau_zwei + ',' + gruen_zwei + ',.8) 100%)';




             for (var i = 0; i < 6; i++) {

              var rot = getRandom(0, 255);
              var blau = getRandom(0, 255);
              var gruen = getRandom(0, 255);
              var transparent = getRandom(5, 5);
              var grad = getRandom(-45, 45);
              var prozent_eins = getRandom(0, (screen.width / 4) * 3);
              var prozent_zwei = getRandom(prozent_eins, screen.width);
              alles = alles + ' ,-webkit-linear-gradient(' + grad + 'deg,transparent 0,transparent ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_zwei + 'px,transparent ' + prozent_zwei + 'px,transparent 100%)';
             }

            } else {

             if (checkBrowserName('firefox')) {

              var rot = getRandom(0, 255);
              var blau = getRandom(0, 255);
              var gruen = getRandom(0, 255);
              var rot_zwei = getRandom(0, rot);
              var blau_zwei = getRandom(0, blau);
              var gruen_zwei = getRandom(0, gruen);
              var transparent = getRandom(2, 5);
              var alles = '-moz-linear-gradient(rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') 0%, rgba(' + rot_zwei + ',' + blau_zwei + ',' + gruen_zwei + ',.8) 100%)';




              for (var i = 0; i < 6; i++) {

               var rot = getRandom(0, 255);
               var blau = getRandom(0, 255);
               var gruen = getRandom(0, 255);
               var transparent = getRandom(5, 5);
               var grad = getRandom(-45, 45);
               var prozent_eins = getRandom(0, (screen.width / 4) * 3);
               var prozent_zwei = getRandom(prozent_eins, screen.width);
               alles = alles + ' ,-moz-linear-gradient(' + grad + 'deg,transparent 0,transparent ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_zwei + 'px,transparent ' + prozent_zwei + 'px,transparent 100%)';
              }


             } else {
              var rot = getRandom(0, 255);
              var blau = getRandom(0, 255);
              var gruen = getRandom(0, 255);
              var rot_zwei = getRandom(0, rot);
              var blau_zwei = getRandom(0, blau);
              var gruen_zwei = getRandom(0, gruen);
              var transparent = getRandom(2, 5);
              var alles = 'linear-gradient(rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') 0%, rgba(' + rot_zwei + ',' + blau_zwei + ',' + gruen_zwei + ',.8) 100%)';




              for (var i = 0; i < 6; i++) {

               var rot = getRandom(0, 255);
               var blau = getRandom(0, 255);
               var gruen = getRandom(0, 255);
               var transparent = getRandom(5, 5);
               var grad = getRandom(-45, 45);
               var prozent_eins = getRandom(0, (screen.width / 4) * 3);
               var prozent_zwei = getRandom(prozent_eins, screen.width);
               alles = alles + ' ,linear-gradient(' + grad + 'deg,transparent 0,transparent ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_zwei + 'px,transparent ' + prozent_zwei + 'px,transparent 100%)';
              }

             }
            }
            scope.style = {background: alles};
           }
          };
         }
        ]);

