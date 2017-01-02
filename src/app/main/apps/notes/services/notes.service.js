(function ()
{
 'use strict';

 angular
         .module('app.notes')
         .factory('NotesService', NotesService);

 /** @ngInject */
 function NotesService(msApi, $q)
 {
  var service = {
   data: [],
   getNote: getNote,
   createNote: createNote,
   updateNote: updateNote,
   updateNoteDescription: updateNoteDescription,
   addNote: addNote,
   getData: getData
  };


  /**
   * Create a Note Note
   *
   * @param noteData
   * @returns {*}
   */
  function createNote(noteData)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('notes.createNote@save', noteData,
           function (response)
           {
            // Resolve the promise
            deferred.resolve(response);
           },
           function (response)
           {
            // Reject the promise
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Update a Note
   *
   * @param noteData
   *
   * @returns promise of the deferred response
   */
  function updateNote(noteData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('note.updateNote@save', noteData,
           function (response)
           {
            deferred.resolve(response);
           },
           function (response)
           {
            deferred.reject(response);
           }
   );
   return deferred.promise;
  }

  /**
   * Update a Note Title and Description
   *
   * @param noteData
   *
   * @returns promise of the deferred response
   */
  function updateNoteDescription(noteData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('note.updateNoteDescription@save',
           noteData,
           function (response)
           {
            deferred.resolve(response);
           },
           function (response)
           {
            deferred.reject(response);
           }
   );
   return deferred.promise;
  }

  /**
   * Add Note
   * @param note
   */
  function addNote(note)
  {
   service.data.push(note);
  }

  /**
   * Get note data
   *
   * @param boardId
   * @param listFormat
   * @returns {*}
   */
  function getNote(noteId, listFormat)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('notes.getNote@get', {id: noteId, listFormat: listFormat},
           function (response)
           {
            deferred.resolve(response);
           },
           function (response)
           {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Get service data
   * @returns {Array}
   */
  function getData()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('notes.notes@get', {},
           // SUCCESS
                   function (response)
                   {
                    // Attach the data
                    service.data = response.data;

                    // Resolve the promise
                    deferred.resolve(response);
                   },
                   // ERROR
                           function (response)
                           {
                            // Reject the promise
                            deferred.reject(response);
                           }
                   );

                   return deferred.promise;
                  }

          return service;

         }
})();