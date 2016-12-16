(function ()
{
 'use strict';

 angular
         .module('app.profile')
         .factory('ProfileService', ProfileService);

 /** @ngInject */
 function ProfileService($q, msApi)
 {
  var service = {
   getProfile: getProfile
  };

  /**
   * Get board data from the server
   *
   * @param boardId
   * @returns {*}
   */
  function getProfile(userId)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('profile.profile@get', {userId: userId},
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