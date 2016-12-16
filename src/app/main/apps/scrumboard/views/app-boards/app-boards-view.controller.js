(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('AppBoardsViewController', AppBoardsViewController);

 /** @ngInject */
 function AppBoardsViewController($stateParams, BoardService, $rootScope)
 {
  var vm = this;

  init();

  // Data
  vm.boardList = [];

  function init() {
   BoardService.getBoardsByType($stateParams.app_name).then(function (data) {
    vm.boardList = data;
    angular.forEach(vm.boardList, function (component) {
     if (component.component_picture_url || component.component_picture_url === 'default.png') {
      component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
     }
    });
   });
  }

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = $stateParams.app_name;
  ;
  // Methods

  //////////
 }
})();