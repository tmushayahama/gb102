(function ()
{
 'use strict';

 angular
         .module('app.mentorship')
         .factory('MentorshipService', MentorshipService);

 /** @ngInject */
 function MentorshipService(msApi, $q) {
  var service = {
   data: [],
   getMentorships: getMentorships,
   getMentorshipsByType: getMentorshipsByType,
   getMentorshipApp: getMentorshipApp,
   getMentorship: getMentorship,
   getRandomMentorship: getRandomMentorship,
   getRandomMentorshipByType: getRandomMentorshipByType,
   createMentorship: createMentorship,
   updateMentorship: updateMentorship,
   updateMentorshipDescription: updateMentorshipDescription,
   updateMentorshipBackground: updateMentorshipBackground,
   //Mentorship Request
   getRequestSuggestions: getRequestSuggestions,
   createMentorshipRequests: createMentorshipRequests,
   //Mentorship Bookmarks
   getMentorshipBookmarks: getMentorshipBookmarks,
   createMentorshipBookmark: createMentorshipBookmark,
   //User Mentorships
   getUserMentorships: getUserMentorships,
  };


  // ******************************
  // Internal methods
  // ******************************

  function deferredHandler(data, deferred, defaultMsg) {
   var error = '';
   if (!data || typeof data !== 'object') {
    error = 'Error';
   }
   if (!error && data.result && data.result.error) {
    error = data.result.error;
   }
   if (!error && data.error) {
    error = data.error.message;
   }
   if (!error && defaultMsg) {
    error = defaultMsg;
   }
   if (error) {
    return deferred.reject(data);
   }
   return deferred.resolve(data);
  }

  /**
   * Get mentorship data from the server
   *
   * @returns promise of the deferred response
   */
  function getMentorships(listFormat) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.mentorships@get',
           {listFormat: listFormat},
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Get mentorship data from the server
   *
   * @param appName
   * @returns promise of the deferred response
   */
  function getMentorshipsByType(appName) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.mentorshipsByType@query',
           {appName: appName},
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Get mentorship app and its submentorships
   *
   * @param appName
   * @returns promise of the deferred response
   */
  function getMentorshipApp(appName) {
   var deferred = $q.defer();

   msApi.request('mentorship.mentorshipApp@get', {appName: appName},
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Get mentorship data from the server
   *
   * @param mentorshipId
   * @param listFormat
   * @returns promise of the deferred response
   */
  function getMentorship(mentorshipId, listFormat) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.mentorship@get',
           {id: mentorshipId, listFormat: listFormat},
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Get a random mentorship data from the server
   *
   * @returns promise of the deferred response
   */
  function getRandomMentorship() {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.randomMentorship@get', {},
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Get a random mentorship data by its type
   *
   * @param typeId type of the mentorship
   * @returns promise of the deferred response
   */
  function getRandomMentorshipByType(typeId) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.randomMentorshipByType@get', {typeId: typeId},
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Create a Mentorship
   *
   * @param mentorshipData
   *
   * @returns promise of the deferred response
   */
  function createMentorship(mentorshipData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.createMentorship@save', mentorshipData,
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );
   return deferred.promise;
  }

  /**
   * Update a Mentorship
   *
   * @param mentorshipData
   *
   * @returns promise of the deferred response
   */
  function updateMentorship(mentorshipData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.updateMentorship@save', mentorshipData,
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );
   return deferred.promise;
  }

  /**
   * Update a Mentorship Title and Description
   *
   * @param mentorshipData
   *
   * @returns promise of the deferred response
   */
  function updateMentorshipDescription(mentorshipData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.updateMentorshipDescription@save',
           mentorshipData,
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );
   return deferred.promise;
  }

  /**
   * Update a Mentorship Title and Background
   *
   * @param mentorshipData
   *
   * @returns promise of the deferred response
   */
  function updateMentorshipBackground(mentorshipData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.updateMentorshipBackground@save',
           mentorshipData,
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );
   return deferred.promise;
  }

  /* Mentorship Request */

  /**
   * A query search for the suggested contributors
   *
   * @param mentorshipId
   * @param typeId request type id
   *
   * @returns promise of the deferred response
   */
  function getRequestSuggestions(mentorshipId, typeId) {
   var deferred = $q.defer();

   msApi.request('mentorship.getRequestSuggestions@query',
           {
            mentorshipId: mentorshipId,
            typeId: typeId
           },
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Create a Mentorship Request
   *
   * @param mentorshipRequestData
   *
   * @returns promise of the deferred response
   */
  function createMentorshipRequests(mentorshipRequestData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.createMentorshipRequests@save', mentorshipRequestData,
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /* Mentorship Bookmarks */

  /**
   * Get all Mentorship Bookmarks of a specific user
   *
   * @param creatorId a specific user
   * @returns promise of the deferred response
   */
  function getMentorshipBookmarks(creatorId) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.getMentorshipBookmarks@query', {creatorId: creatorId},
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Create a Mentorship Bookmark
   *
   * @param mentorshipData
   * @returns promise of the deferred response
   */
  function createMentorshipBookmark(mentorshipData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.createMentorshipBookmark@save', mentorshipData,
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Get All mentorships of a user
   *
   * @param {type} userId the user id
   * @param {type} listFormat the list display format
   * @returns {$q@call;defer.promise}
   */
  function getUserMentorships(userId, listFormat) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('mentorship.userMentorships@get', {userId: userId, listFormat: listFormat},
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  return service;

 }
})();