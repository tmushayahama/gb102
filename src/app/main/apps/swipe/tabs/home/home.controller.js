(function ()
{
 'use strict';

 angular
         .module('app.swipe')
         .controller('SwipeHomeTabController', SwipeHomeTabController);

 /** @ngInject */
 function SwipeHomeTabController(level_categories, SwipeService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.swipeTypes = level_categories.swipe;
  vm.component;
  vm.swipes;
  ////////

  //Methods
  vm.getSwipe = getSwipe;
  vm.createSwipe = createSwipe;
  ////////

  //Init
  getSwipe();
  ////////

  /**
   * Get a random component
   * @returns
   */
  function getSwipe() {
   SwipeService.getSwipe().then(function (response) {
    vm.component = response;
    addComponentPlaceholderImage(vm.component);
   });
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
   SwipeService.createSwipe(data).then(function (response) {
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

 }
})();