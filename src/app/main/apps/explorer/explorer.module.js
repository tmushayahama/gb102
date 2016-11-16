(function ()
{
 'use strict';

 angular
         .module('app.explorer', [])
         .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {
  $stateProvider.state('app.explorer', {
   url: '/explorer',
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/explorer/explorer.html',
     controller: 'ExplorerController as vm'
    }
   },
   resolve: {
    Explorer: function (ExplorerService)
    {
     return ExplorerService.getComponents();
    },
    Labels: function (LabelsService)
    {
     return LabelsService.getData();
    }
   }
  });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/explorer');

  // Api
  //msApiProvider.register('explorer.components', ['/api/components/listformat/2']);
  msApiProvider.register('explorer.explorer', ['src/app/data/explorer/explorer.json']);
  msApiProvider.register('explorer.labels', ['src/app/data/explorer/labels.json']);

  // Navigation
  msNavigationServiceProvider.saveItem('apps.explorer', {
   title: 'Explorer',
   icon: 'icon-lightbulb',
   state: 'app.explorer',
   weight: 11
  });

 }

})();