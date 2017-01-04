(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('BoardsHomeTabController', BoardsHomeTabController);

 /** @ngInject */
 function BoardsHomeTabController(ExplorerComponentService, $rootScope)
 {
  var vm = this;

  // Data
  vm.boardList = [];

  init();

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Explorer";


  // Methods
  function init() {
   ExplorerComponentService.getComponents().then(function (data) {
    vm.boardList = data;
    angular.forEach(vm.boardList.apps, function (app, key) {
     angular.forEach(app.components, function (component, key) {
      if (component.component_picture_url || component.component_picture_url === 'default.png') {
       component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
      }
     });
    });
    angular.forEach(vm.boardList.activities, function (app, key) {
     angular.forEach(app.components, function (component, key) {
      if (component.component_picture_url || component.component_picture_url === 'default.png') {
       component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
      }
     });
    });
   });
  }
  //////////
 }
})();