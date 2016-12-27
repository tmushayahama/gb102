(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('BoardsViewController', BoardsViewController);

 /** @ngInject */
 function BoardsViewController(BoardService, DialogService, $scope, $rootScope)
 {
  var vm = this;

  // Data
  vm.boardList = [];
  /////////

  //Methods
  vm.openAddComponentDialog = DialogService.openAddComponentDialog;

  init();

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Explorer";


  // Methods
  function init() {
   BoardService.getBoards().then(function (data) {
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
  $scope.$on('$stateChangeSuccess', function (event, toState) {
   $scope.selectedIndex = toState.data.selectedTab;
  });
  //////////
 }
})();