/*
 *
 * This is a Skill Section SearchService factory which
 * connects to the backend
 */

(function ()
{
 'use strict';

 angular
         .module('app.search')
         .factory('SearchService', SearchService);

 /** @ngInject */
 function SearchService($q, msApi)
 {
  var service = {
   data: {},
   suggestionSearch: suggestionSearch,
   keywordSearch: keywordSearch,
   searchByType: searchByType
  };


  /**
   * A quicker suggestion General search
   *
   * @param keyword a search text
   * @returns {*}
   */
  function suggestionSearch(keyword) {
   var deferred = $q.defer();

   msApi.request('search.suggestionSearch@query', {keyword: keyword},
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
   * General search
   * @param keyword a search text
   * @returns {*}
   */
  function keywordSearch(keyword) {
   var deferred = $q.defer();

   msApi.request('search.keywordSearch@query', {keyword: keyword},
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
   * Search by keyword in a specific type
   *
   * @param keyword a search text
   * @param typeId type of the search
   * @returns {*}
   */
  function searchByType(keyword, typeId) {
   var deferred = $q.defer();

   msApi.request('search.searchByType@get', {typeId: typeId},
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