(function ()
{
 'use strict';

 angular
         .module('app.scrumboard')
         .controller('BoardsViewController', BoardsViewController);

 /** @ngInject */
 function BoardsViewController(BoardList, $rootScope)
 {
  var vm = this;

  // Data
  vm.boardList = BoardList;

  angular.forEach(vm.boardList.apps, function (app, key) {
   angular.forEach(app.components, function (component, key) {
    if (component.component_picture_url || component.component_picture_url === 'default.png') {
     component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
    }
   });
  });

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Explorer";
  // Methods

  //////////
 }
})();