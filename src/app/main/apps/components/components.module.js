(function ()
{
 'use strict';

 angular
         .module('app.components', [])
         .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {
  $stateProvider.state('app.components', {
   url: '/components',
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/components/components.html',
     controller: 'ComponentsController as vm'
    }
   },
   resolve: {
    Components: function (ComponentsService)
    {
     return ComponentsService.getData();
    },
    Labels: function (LabelsService)
    {
     return LabelsService.getData();
    }
   }
  });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/components');

  // Api
  msApiProvider.register('components.getComponent', ['/api/components/:id/listformat/:listFormat',
   {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('components.createComponent', ['/api/components/create']);
  msApiProvider.register('component.updateComponent', ['/api/components/update']);
  msApiProvider.register('component.updateComponentDescription', ['/api/components/:componentId/update/description', {
    componentId: "@componentId",
   }]);
  msApiProvider.register('component.updateComponentBackground', ['/api/components/:componentId/update/background', {
    componentId: "@componentId",
   }]);
 }

})();