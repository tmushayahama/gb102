(function ()
{
 'use strict';

 angular
         .module('app.components')
         .factory('ComponentsService', ComponentsService);

 /** @ngInject */
 function ComponentsService(msApi, $q)
 {
  var service = {
   data: [],
   getComponent: getComponent,
   createComponent: createComponent,
   updateComponent: updateComponent,
   updateComponentDescription: updateComponentDescription,
   updateComponentBackground: updateComponentBackground,
   addComponent: addComponent,
   getData: getData
  };


  /**
   * Create a Component Component
   *
   * @param componentData
   * @returns {*}
   */
  function createComponent(componentData)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('components.createComponent@save', componentData,
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
   * Add Component
   * @param component
   */
  function addComponent(component)
  {
   service.data.push(component);
  }

  /**
   * Get component data
   *
   * @param boardId
   * @param listFormat
   * @returns {*}
   */
  function getComponent(componentId, listFormat)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('components.getComponent@get', {id: componentId, listFormat: listFormat},
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

   msApi.request('components.components@get', {},
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