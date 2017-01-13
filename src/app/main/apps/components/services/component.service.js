(function ()
{
 'use strict';

 angular
         .module('app.components')
         .factory('ComponentService', ComponentService);

 /** @ngInject */
 function ComponentService(msApi, $q) {
  var service = {
   data: [],
   getComponents: getComponents,
   getComponentsByType: getComponentsByType,
   getComponentApp: getComponentApp,
   getComponent: getComponent,
   getRandomComponent: getRandomComponent,
   getRandomComponentByType: getRandomComponentByType,
   createComponent: createComponent,
   updateComponent: updateComponent,
   updateComponentDescription: updateComponentDescription,
   updateComponentBackground: updateComponentBackground,
   //Component Contribution
   getContributionSuggestions: getContributionSuggestions,
   createComponentContributions: createComponentContributions,
   //Component Bookmarks
   getComponentBookmarks: getComponentBookmarks,
   createComponentBookmark: createComponentBookmark,
   //User Components
   getUserComponents: getUserComponents,
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
   * Get component data from the server
   *
   * @returns promise of the deferred response
   */
  function getComponents(listFormat) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.components@get',
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
   * Get component data from the server
   *
   * @param appName
   * @returns promise of the deferred response
   */
  function getComponentsByType(appName) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.componentsByType@query',
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
   * Get component app and its subcomponents
   *
   * @param appName
   * @returns promise of the deferred response
   */
  function getComponentApp(appName) {
   var deferred = $q.defer();

   msApi.request('component.componentApp@get', {appName: appName},
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
   * Get component data from the server
   *
   * @param componentId
   * @param listFormat
   * @returns promise of the deferred response
   */
  function getComponent(componentId, listFormat) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.component@get',
           {id: componentId, listFormat: listFormat},
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
   * Get a random component data from the server
   *
   * @returns promise of the deferred response
   */
  function getRandomComponent() {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.randomComponent@get', {},
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
   * Get a random component data by its type
   *
   * @param typeId type of the component
   * @returns promise of the deferred response
   */
  function getRandomComponentByType(typeId) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.randomComponentByType@get', {typeId: typeId},
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
   * Create a Component
   *
   * @param componentData
   *
   * @returns promise of the deferred response
   */
  function createComponent(componentData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.createComponent@save', componentData,
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
   * Update a Component
   *
   * @param componentData
   *
   * @returns promise of the deferred response
   */
  function updateComponent(componentData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.updateComponent@save', componentData,
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
   * Update a Component Title and Description
   *
   * @param componentData
   *
   * @returns promise of the deferred response
   */
  function updateComponentDescription(componentData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.updateComponentDescription@save',
           componentData,
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
   * Update a Component Title and Background
   *
   * @param componentData
   *
   * @returns promise of the deferred response
   */
  function updateComponentBackground(componentData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.updateComponentBackground@save',
           componentData,
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );
   return deferred.promise;
  }

  /* Component Contribution */

  /**
   * A query search for the suggested contributors
   *
   * @param componentId
   * @param typeId contribution type id
   *
   * @returns promise of the deferred response
   */
  function getContributionSuggestions(componentId, typeId) {
   var deferred = $q.defer();

   msApi.request('component.getContributionSuggestions@query',
           {
            componentId: componentId,
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
   * Create a Component Contribution
   *
   * @param componentContributionData
   *
   * @returns promise of the deferred response
   */
  function createComponentContributions(componentContributionData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.createComponentContributions@save', componentContributionData,
           function (response) {
            deferredHandler(response, deferred);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /* Component Bookmarks */

  /**
   * Get all Component Bookmarks of a specific user
   *
   * @param creatorId a specific user
   * @returns promise of the deferred response
   */
  function getComponentBookmarks(creatorId) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.getComponentBookmarks@query', {creatorId: creatorId},
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
   * Create a Component Bookmark
   *
   * @param componentData
   * @returns promise of the deferred response
   */
  function createComponentBookmark(componentData) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.createComponentBookmark@save', componentData,
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
   * Get All components of a user
   *
   * @param {type} userId the user id
   * @param {type} listFormat the list display format
   * @returns {$q@call;defer.promise}
   */
  function getUserComponents(userId, listFormat) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('component.userComponents@get', {userId: userId, listFormat: listFormat},
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