(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('BoardsMatcherTabController', BoardsMatcherTabController);

 /** @ngInject */
 function BoardsMatcherTabController(level_categories, BoardService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.matcherTypes = level_categories.matcher;
  vm.component;
  vm.matchers;
  ////////

  //Methods
  vm.getMatcher = getMatcher;
  vm.getMatchers = getMatchers;
  vm.createMatcher = createMatcher;
  ////////

  //Init
  getMatcher();
  getMatchers($rootScope.user.id);
  ////////

  /**
   * Get a random component
   * @returns
   */
  function getMatcher() {
   BoardService.getRandomBoardByType(level_categories.component.question).then(function (response) {
    vm.component = response;
    addComponentPlaceholderImage(vm.component);
   });
  }

  /**
   * Get all user's matchers
   *
   * @returns
   */
  function getMatchers(creatorId) {
   if (creatorId) {
    BoardService.getComponentBookmarks(creatorId).then(function (response) {
     vm.matchers = response;
     angular.forEach(vm.matchers, function (matcher) {
      addComponentPlaceholderImage(matcher.component);
     });
    });
   }
  }

  /**
   * Creates a matcher component
   *
   * @param {type} levelId matcher type id
   * @returns {undefined}
   */
  function createMatcher(levelId) {
   var data = {
    componentId: vm.component.id,
    levelId: levelId
            // description: ""
   };
   BoardService.createComponentBookmark(data).then(function (response) {
    getMatcher();
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
  $rootScope.appName = "Explorer Matcher";

 }
})();