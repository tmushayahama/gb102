(function ()
{
 'use strict';

 angular
         .module('app.components', [])
         .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/components');

  // Api
  msApiProvider.register('component.component', ['/api/components/:id/listformat/:listFormat',
   {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('component.createComponent', ['/api/components/create']);
  msApiProvider.register('component.updateComponent', ['/api/components/update']);
  msApiProvider.register('component.updateComponentDescription', ['/api/components/:componentId/update/description', {
    componentId: "@componentId"
   }]);
  msApiProvider.register('component.updateComponentBackground', ['/api/components/:componentId/update/background', {
    componentId: "@componentId"
   }]);
  msApiProvider.register('component.components', ['/api/components/listformat/:listFormat',
   {
    listFormat: "@listFormat"
   }]);
  msApiProvider.register('component.componentApp', ['api/components/app/:appName',
   {
    appName: '@appName'
   }]);
  msApiProvider.register('component.componentAppPage', ['api/components/app/:appName/page/:page',
   {
    appName: '@appName',
    page: '@page'
   }]);
  msApiProvider.register('component.componentsByType', ['api/components/listformat/1/type/:appName',
   {
    appName: '@appName'
   }]);
  msApiProvider.register('component.randomComponentByType', ['/api/components/random/type/:typeId',
   {
    typeId: '@typeId'
   }
  ]);
  msApiProvider.register('component.randomComponent', ['/api/components/random']);

  /*Component Contribution*/
  msApiProvider.register('component.getContributionSuggestions', ['api/components/:componentId/contribution/type/:typeId/suggestions',
   {
    componentId: "@componentId",
    typeId: "@typeId"
   }]);
  msApiProvider.register('component.createComponentContributions', ['/api/components/contributions/create']);

  /*Component Bookmarks*/
  msApiProvider.register('component.getComponentBookmarks', ['/api/components/bookmarks/:creatorId',
   {
    creatorId: "@creatorId"
   }]);
  msApiProvider.register('component.createComponentBookmark', ['/api/components/bookmarks/create']);
  /*User Component*/
  msApiProvider.register('component.userComponents', ['/api/components/user/:userId/listformat/:listFormat',
   {
    userId: "@userId",
    listFormat: "@listFormat"
   }]);
  msApiProvider.register('component.userComponentsByType', ['/api/components/user/:userId/type/:typeId',
   {
    userId: "@userId",
    typeId: '@typeId',
   }]);
 }

})();