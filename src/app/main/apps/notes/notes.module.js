(function ()
{
 'use strict';

 angular
         .module('app.notes', [])
         .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {
  $stateProvider.state('app.notes', {
   url: '/notes',
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/notes/notes.html',
     controller: 'NotesController as vm'
    }
   },
   resolve: {
    Notes: function (NotesService)
    {
     return NotesService.getData();
    },
    Labels: function (LabelsService)
    {
     return LabelsService.getData();
    }
   }
  });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/notes');

  // Api
  msApiProvider.register('notes.getNote', ['/api/components/:id/listformat/:listFormat',
   {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('notes.createNote', ['/api/components/create']);
  // msApiProvider.register('notes.notes', ['src/app/data/notes/notes.json']);
  //msApiProvider.register('notes.labels', ['src/app/data/notes/labels.json']);

 }

})();