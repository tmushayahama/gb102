(function ()
{
 'use strict';

 angular
         .module('app.matcher')
         .controller('MatcherHomeTabController', MatcherHomeTabController);

 /** @ngInject */
 function MatcherHomeTabController(level_categories, MatcherService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.component;
  vm.matcherAnswerForm = {};
  vm.matchers;
  ////////

  //Methods
  vm.getMatcher = getMatcher;
  vm.createMatcher = createMatcher;
  ////////

  //Init
  getMatcher();
  ////////

  /**
   * Get a random component
   * @returns
   */
  function getMatcher() {
   MatcherService.getMatcherByType(level_categories.component.question).then(function (response) {
    vm.component = response;
    addComponentPlaceholderImage(vm.component);
   });
  }

  /**
   * Creates a matcher component
   *
   * @param {type} levelId matcher type id
   * @returns {undefined}
   */
  function createMatcher() {
   if (!vm.matcherAnswerForm.title) {
    return;
   }
   var data = {
    title: vm.matcherAnswerForm.title,
    description: "",
    parentComponentId: vm.component.id, //parent component
    typeId: level_categories.matcher_answer.answer,
    privacyId: level_categories.privacy.public
   };
   MatcherService.createMatcher(data).then(function (response) {
    getMatcher();
    vm.matcherAnswerForm.title = "";
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