/*
 *
 * This is a Skill Section MatcherService factory which
 * connects to the backend
 */

(function ()
{
 'use strict';

 angular
         .module('app.matcher')
         .factory('MatcherService', MatcherService);

 /** @ngInject */
 function MatcherService($q, msApi)
 {
  var service = {
   data: {},
   getMatcher: getMatcher,
   getMatcherByType: getMatcherByType,
   getMatchers: getMatchers,
   createMatcher: createMatcher
  };

  /**
   * Get a matcher component data from the server
   *
   * @returns {*}
   */
  function getMatcher()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('matcher.getMatcher@get', {},
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
   * Get a matcher component data by its type
   *
   * @param typeId type of the matcher
   * @returns {*}
   */
  function getMatcherByType(typeId)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('matcher.getMatcherByType@get', {typeId: typeId},
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
   * Get all Matcher Component Bookmarks of a specific user
   *
   * @param creatorId a specific user
   * @returns {*}
   */
  function getMatchers(creatorId)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('matcher.getMatchers@query', {creatorId: creatorId},
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
   * Create a Matcher Component Bookmark
   *
   * @param componentData
   * @returns {*}
   */
  function createMatcher(componentData)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('matcher.createMatcher@save', componentData,
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

  return service;
 }
})();