(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('AppComponentsHomeTabController', AppComponentsHomeTabController);

 /** @ngInject */
 function AppComponentsHomeTabController(ComponentService, $rootScope)
 {
  var vm = this;

  // Data
  vm.loadMoreData = {
   currentPage: 1,
   pageSize: 30,
   total: 0,
   hasMorePages: false
  };

  // Methods
  vm.loadMore = loadMore;
  //////////
  function loadMore(appName, components) {
   ComponentService.getComponentApp(
           appName,
           vm.loadMoreData.currentPage,
           vm.loadMoreData.pageSize).then(function (data) {
    vm.loadMoreData.currentPage++;
    angular.forEach(data.components, function (component) {
     if (component.component_picture_url || component.component_picture_url === 'default.png') {
      component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
     }
     components.push(component);
    });
   });
  }


 }
})();