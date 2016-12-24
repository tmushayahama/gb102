(function ()
{
 'use strict';

 angular
         .module('app.matcher')
         .controller('MatcherHistoryTabController', MatcherHistoryTabController);

 /** @ngInject */
 function MatcherHistoryTabController(level_categories, MatcherService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.matcherTypes = level_categories.matcher;
  vm.component;
  vm.matchers;
  ////////

  //Methods
  vm.getMatchers = getMatchers;
  ////////

  //Init
  getMatchers($rootScope.user.id);
  ////////

  /**
   * Get all user's matchers
   *
   * @param creatorId the user's id
   * @returns
   */
  function getMatchers(creatorId) {
   if (creatorId) {
    MatcherService.getMatchers(creatorId).then(function (response) {
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
   MatcherService.createMatcher(data).then(function (response) {
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

 }
})();