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
   getComponentContributions: getComponentContributions,
   getComponentContribution: getComponentContribution,
   //Component Bookmarks
   getComponentBookmarks: getComponentBookmarks,
   createComponentBookmark: createComponentBookmark,
   //User Components
   getUserComponents: getUserComponents,
   getUserComponentsByType: getUserComponentsByType
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
   var deferred = $q.defer();

   msApi.request('component.components@get', {listFormat: listFormat}
   , function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

   return deferred.promise;
  }

  /**
   * Get component data from the server
   *
   * @param componentId
   * @param typeId
   * @returns promise of the deferred response
   */
  function getComponentsByType(componentId, typeId) {
   var deferred = $q.defer();

   msApi.request('component.componentsByType@query', {
    componentId: componentId, typeId: typeId}
   , function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

   return deferred.promise;
  }

  /**
   * Get component app and its subcomponents
   *
   * @param appName
   * @param page the page number
   * @returns promise of the deferred response
   */
  function getComponentApp(appName, page) {
   var deferred = $q.defer();
   var url = {
    name: 'component.componentApp@get',
    params: {appName: appName}
   };

   if (page > 0) {
    url.name = 'component.componentAppPage@get';
    url.params.page = page;
   }

   msApi.request(url.name, url.params, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

   return deferred.promise;
  }

  /**
   * Get component data from the server
   *
   * @param componentId
   * @param listFormat
   * @param depth if a tree then depth is needed, default is 1
   * @returns promise of the deferred response
   */
  function getComponent(componentId, listFormat, depth) {
   var deferred = $q.defer();

   var url = {
    name: 'component.component@get',
    params: {id: componentId, listFormat: listFormat}
   };

   if (depth) {
    url.name = 'component.componentWithDepth@get';
    url.params.depth = depth;
   }

   msApi.request(url.name, url.params, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

   return deferred.promise;
  }

  /**
   * Get a random component data from the server
   *
   * @returns promise of the deferred response
   */
  function getRandomComponent() {
   var deferred = $q.defer();

   msApi.request('component.randomComponent@get', {}
   , function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

   return deferred.promise;
  }

  /**
   * Get a random component data by its type
   *
   * @param typeId type of the component
   * @returns promise of the deferred response
   */
  function getRandomComponentByType(typeId) {
   var deferred = $q.defer();

   msApi.request('component.randomComponentByType@get', {typeId: typeId}
   , function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

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
   var deferred = $q.defer();

   msApi.request('component.createComponent@save', componentData, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

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
   var deferred = $q.defer();

   msApi.request('component.updateComponent@save', componentData, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

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
   var deferred = $q.defer();

   msApi.request('component.updateComponentDescription@save', componentData, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });
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
   var deferred = $q.defer();

   msApi.request('component.updateComponentBackground@save', componentData, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });
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

   msApi.request('component.getContributionSuggestions@query', {
    componentId: componentId,
    typeId: typeId
   }, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

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
   var deferred = $q.defer();

   msApi.request('component.createComponentContributions@save', componentContributionData, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

   return deferred.promise;
  }

  /**
   * Get all Component Contributions of a component
   *
   * @param componentId a specific component
   * @returns promise of the deferred response
   */
  function getComponentContributions(componentId) {
   var deferred = $q.defer();

   msApi.request('component.getComponentContributions@query', {
    componentId: componentId
   }, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

   return deferred.promise;
  }


  /**
   * Get a Component Contributions of a contributor
   *
   * @param contributionId a contributor
   *
   * @returns promise of the deferred response
   */
  function getComponentContribution(contributionId) {
   var deferred = $q.defer();

   msApi.request('component.getComponentContribution@get', {
    contributionId: contributionId
   }, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

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

   var deferred = $q.defer();

   msApi.request('component.getComponentBookmarks@query', {
    creatorId: creatorId}
   , function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

   return deferred.promise;
  }

  /**
   * Create a Component Bookmark
   *
   * @param componentData
   * @returns promise of the deferred response
   */
  function createComponentBookmark(componentData) {

   var deferred = $q.defer();

   msApi.request('component.createComponentBookmark@save', componentData, function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   });

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

   var deferred = $q.defer();

   msApi.request('component.userComponents@get', {
    userId: userId, listFormat: listFormat}
   , function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   }
   );

   return deferred.promise;
  }

  /**
   * Get All components of a user by type
   *
   * @param {type} userId the user id
   * @param {type} typeId the type of the component
   * @returns {$q@call;defer.promise}
   */
  function getUserComponentsByType(userId, typeId) {

   var deferred = $q.defer();

   msApi.request('component.userComponentsByType@query', {
    userId: userId, typeId: typeId}
   , function (response) {
    deferredHandler(response, deferred);
   }, function (response) {
    deferred.reject(response);
   }
   );

   return deferred.promise;
  }

  return service;

 }
})();