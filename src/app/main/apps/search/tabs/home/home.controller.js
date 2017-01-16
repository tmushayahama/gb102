(function ()
{
 'use strict';

 angular
         .module('app.search')
         .controller('SearchHomeTabController', SearchHomeTabController);

 /** @ngInject */
 function SearchHomeTabController(level_categories, SearchService, $scope, $rootScope)
 {
  var vm = this;

  //Data
  vm.searchTypes = level_categories.search;
  vm.component;
  vm.searchs;
  ////////

  //Methods
  vm.getSearch = getSearch;
  vm.createSearch = createSearch;
  ////////

  //Init
  getSearch();
  ////////

  /**
   * Get a random component
   * @returns
   */
  function getSearch() {
   SearchService.getSearch().then(function (response) {
    vm.component = response;
    addComponentPlaceholderImage(vm.component);
   });
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