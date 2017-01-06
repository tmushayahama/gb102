(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ExplorerComponentsController', ExplorerComponentsController);

 /** @ngInject */
 function ExplorerComponentsController(add_component_tabs, ExplorerComponentService, DialogService, $scope, $rootScope)
 {
  var vm = this;

  // Data
  vm.components = [];
  vm.tabs = add_component_tabs;
  /////////

  //Methods
  vm.openAddComponentDialog = DialogService.openAddComponentDialog;

  init();

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Explorer";


  // Methods
  function init() {
   ExplorerComponentService.getComponents(5).then(function (data) {
    vm.components = data;
    // vm.displayComponents = shuffleSampleGroups();
    angular.forEach(vm.components.recommendations, function (recommendation) {
     angular.forEach(recommendation.recommendationComponents, function (recommendationComponent) {
      if (recommendationComponent.component.component_picture_url || recommendationComponent.component.component_picture_url === 'default.png') {
       recommendationComponent.component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
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