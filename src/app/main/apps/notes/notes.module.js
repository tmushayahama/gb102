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
  msApiProvider.register('note.updateNote', ['/api/components/update']);
  msApiProvider.register('note.updateNoteDescription', ['/api/components/:componentId/update/description', {
    componentId: "@componentId",
   }]);
  msApiProvider.register('note.updateNoteBackground', ['/api/components/:componentId/update/background', {
    componentId: "@componentId",
   }]);
 }

})();