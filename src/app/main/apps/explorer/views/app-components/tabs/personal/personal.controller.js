(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('AppComponentsPersonalTabController', AppComponentsPersonalTabController);

 /** @ngInject */
 function AppComponentsPersonalTabController(level_categories, ExplorerComponentService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.swipeTypes = level_categories.swipe;
  vm.component;
  vm.swipes;
  ////////

  //Methods
  vm.getSwipe = getSwipe;
  vm.getSwipes = getSwipes;
  vm.createSwipe = createSwipe;
  ////////

  //Init
  getSwipe();
  getSwipes($rootScope.user.id);
  ////////

  /**
   * Get a random component
   * @returns
   */
  function getSwipe() {
   ExplorerComponentService.getRandomBoard().then(function (response) {
    vm.component = response;
    addComponentPlaceholderImage(vm.component);
   });
  }

  /**
   * Get all user's swipes
   *
   * @returns
   */
  function getSwipes(creatorId) {
   if (creatorId) {
    ExplorerComponentService.getComponentBookmarks(creatorId).then(function (response) {
     vm.swipes = response;
     angular.forEach(vm.swipes, function (swipe) {
      addComponentPlaceholderImage(swipe.component);
     });
    });
   }
  }

  /**
   * Creates a swipe component
   *
   * @param {type} levelId swipe type id
   * @returns {undefined}
   */
  function createSwipe(levelId) {
   var data = {
    componentId: vm.component.id,
    levelId: levelId
            // description: ""
   };
   ExplorerComponentService.createComponentBookmark(data).then(function (response) {
    getSwipe();
   });
  }

  /**
   * Adds a placeholder css generated image to the component
   *
   * @param {type} component a component to be added a placeholder image
   * @returns {undefined}
   */
  function addComponentPlaceholderImage(component) {
   if (component.component_picture_url || component.component_picture_url === 'default.png') {
    component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
   }
  }

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Explorer Swipe";

 }
})();