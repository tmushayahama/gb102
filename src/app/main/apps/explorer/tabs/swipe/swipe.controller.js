(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('BoardsSwipeTabController', BoardsSwipeTabController);

 /** @ngInject */
 function BoardsSwipeTabController(level_categories, BoardService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.swipeTypes = level_categories.swipe;
  vm.component;
  vm.components;
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
   BoardService.getRandomBoard().then(function (response) {
    vm.component = response;
   });
  }

  /**
   * Get all user's swipes
   *
   * @returns
   */
  function getSwipes(creatorId) {
   if (creatorId) {
    BoardService.getComponentBookmarks(creatorId).then(function (response) {
     vm.components = response;
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
   BoardService.createComponentBookmark(data).then(function (response) {
    getSwipe();
   });
  }

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Explorer Swipe";

 }
})();