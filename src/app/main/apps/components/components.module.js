(function ()
{
 'use strict';

 angular
         .module('app.components', [])
         .config(config);

 /** @ngInject */
 function config(gbConfigProvider, $stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {

  var apiUrl = gbConfigProvider.getConfig("apiUrl");
  // Translation
  $translatePartialLoaderProvider.addPart('app/main/apps/components');

  // Api
  msApiProvider.register('component.component', [apiUrl + 'api/components/:id/listformat/:listFormat', {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('component.componentWithDepth', [apiUrl + 'api/components/:id/listformat/:listFormat/depth/:depth', {
    id: "@id",
    listformat: "@listformat",
    depth: "@depth"
   }]);
  msApiProvider.register('component.createComponent', [apiUrl + 'api/components/create']);
  msApiProvider.register('component.updateComponent', [apiUrl + 'api/components/update']);
  msApiProvider.register('component.updateComponentDescription', [apiUrl + 'api/components/:componentId/update/description', {
    componentId: "@componentId"
   }]);
  msApiProvider.register('component.updateComponentBackground', [apiUrl + 'api/components/:componentId/update/background', {
    componentId: "@componentId"
   }]);
  msApiProvider.register('component.components', [apiUrl + 'api/components/listformat/:listFormat', {
    listFormat: "@listFormat"
   }]);
  msApiProvider.register('component.componentApp', [apiUrl + 'api/components/app/:appName', {
    appName: '@appName'
   }]);
  msApiProvider.register('component.componentAppPage', [apiUrl + 'api/components/app/:appName/page/:page', {
    appName: '@appName',
    page: '@page'
   }]);
  msApiProvider.register('component.componentsByType', [apiUrl + 'api/components/:componentId/type/:typeId', {
    componentId: '@componentId',
    typeId: '@typeId'
   }]);
  msApiProvider.register('component.randomComponentByType', [apiUrl + 'api/components/random/type/:typeId', {
    typeId: '@typeId'
   }]);
  msApiProvider.register('component.randomComponent', [apiUrl + 'api/components/random']);

  /*Component Contribution*/
  msApiProvider.register('component.getContributionSuggestions', [apiUrl + 'api/components/:componentId/contribution/type/:typeId/suggestions', {
    componentId: "@componentId",
    typeId: "@typeId"
   }]);
  msApiProvider.register('component.createComponentContributions', [apiUrl + 'api/components/contributions/create']);
  msApiProvider.register('component.getComponentContributions', [apiUrl + 'api/components/:componentId/contributions', {
    componentId: "@componentId"
   }]);
  msApiProvider.register('component.getComponentContribution', [apiUrl + 'api/contributions/:contributionId', {
    contributionId: "@contributinId"
   }]);

  /*Component Bookmarks*/
  msApiProvider.register('component.getComponentBookmarks', [apiUrl + 'api/components/bookmarks/:creatorId', {
    creatorId: "@creatorId"
   }]);
  msApiProvider.register('component.createComponentBookmark', [apiUrl + 'api/components/bookmarks/create']);
  /*User Component*/
  msApiProvider.register('component.userComponents', [apiUrl + 'api/components/user/:userId/listformat/:listFormat', {
    userId: "@userId",
    listFormat: "@listFormat"
   }]);
  msApiProvider.register('component.userComponentsByType', [apiUrl + 'api/components/user/:userId/type/:typeId', {
    userId: "@userId",
    typeId: '@typeId',
   }]);
 }

})();