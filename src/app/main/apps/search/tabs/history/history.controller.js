(function ()
{
 'use strict';

 angular
         .module('app.search')
         .controller('SearchHistoryTabController', SearchHistoryTabController);

 /** @ngInject */
 function SearchHistoryTabController(level_categories, SearchService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.searchTypes = level_categories.search;
  vm.component;
  vm.searchs;
  ////////

  //Methods
  vm.getSearchs = getSearchs;
  ////////

  //Init
  getSearchs($rootScope.user.id);
  ////////

  /**
   * Get all user's searchs
   *
   * @param creatorId the user's id
   * @returns
   */
  function getSearchs(creatorId) {
   if (creatorId) {
    SearchService.getSearchs(creatorId).then(function (response) {
     vm.searchs = response;
     angular.forEach(vm.searchs, function (search) {
      addComponentPlaceholderImage(search.component);
     });
    });
   }
  }

  /**
   * Creates a search component
   *
   * @param {type} levelId search type id
   * @returns {undefined}
   */
  function createSearch(levelId) {
   var data = {
    componentId: vm.component.id,
    levelId: levelId
            // description: ""
   };
   SearchService.createSearch(data).then(function (response) {
    getSearch();
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