(function ()
{
 'use strict';

 angular
         .module('app.components')
         .directive('gbFloor', gbFloorDirective);

 /** @ngInject */
 function gbFloorDirective()
 {
  return {
   restrict: 'E',
   scope: {
    templatePath: '=template',
    recommendation: '=',
   },
   template: '<div class="" ng-include="templatePath"></div>',
   compile: function (tElement)
   {

    return function postLink(scope, iElement)
    {

    };
   }
  };
 }
})();