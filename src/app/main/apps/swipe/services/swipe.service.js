/*
 *
 * This is a Skill Section SwipeService factory which
 * connects to the backend
 */

(function ()
{
 'use strict';

 angular
         .module('app.swipe')
         .factory('SwipeService', SwipeService);

 /** @ngInject */
 function SwipeService($q, msApi)
 {
  var service = {
   data: {},
   getSwipe: getSwipe,
   getSwipeByType: getSwipeByType,
   getSwipes: getSwipes,
   createSwipe: createSwipe
  };

  /**
   * Get a swipe component data from the server
   *
   * @returns {*}
   */
  function getSwipe()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('swipe.getSwipe@get', {},
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
   * Get a swipe component data by its type
   *
   * @param typeId type of the swipe
   * @returns {*}
   */
  function getSwipeByType(typeId)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('swipe.getSwipeByType@get', {typeId: typeId},
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
   * Get all Swipe Component Bookmarks of a specific user
   *
   * @param creatorId a specific user
   * @returns {*}
   */
  function getSwipes(creatorId)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('swipe.getSwipes@query', {creatorId: creatorId},
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
   * Create a Swipe Component Bookmark
   *
   * @param componentData
   * @returns {*}
   */
  function createSwipe(componentData)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('swipe.createSwipe@save', componentData,
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