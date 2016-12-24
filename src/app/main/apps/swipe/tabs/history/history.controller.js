(function ()
{
 'use strict';

 angular
         .module('app.swipe')
         .controller('SwipeHistoryTabController', SwipeHistoryTabController);

 /** @ngInject */
 function SwipeHistoryTabController(level_categories, SwipeService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.swipeTypes = level_categories.swipe;
  vm.component;
  vm.swipes;
  ////////

  //Methods
  vm.getSwipes = getSwipes;
  ////////

  //Init
  getSwipes($rootScope.user.id);
  ////////

  /**
   * Get all user's swipes
   *
   * @param creatorId the user's id
   * @returns
   */
  function getSwipes(creatorId) {
   if (creatorId) {
    SwipeService.getSwipes(creatorId).then(function (response) {
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