(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .factory('ExplorerService', ExplorerService);

 /** @ngInject */
 function ExplorerService(msApi, $q)
 {
  var service = {
   data: [],
   getComponents: getComponents,
   addComponent: addComponent,
   updateComponent: updateComponent,
   deleteComponent: deleteComponent,
   getData: getData
  };

  /**
   * Add Component
   * @param component
   */
  function addComponent(component)
  {
   service.data.push(component);
  }

  /**
   * Update Component
   * @param component
   */
  function updateComponent(component)
  {
   for (var i = 0; i < service.data.length; i++)
   {
    if (service.data[i].id === component.id)
    {
     service.data[i] = component;
    }
   }
  }

  /**
   * Delete Component
   * @param component
   */
  function deleteComponent(component)
  {
   for (var i = 0; i < service.data.length; i++)
   {
    if (service.data[i].id === component.id)
    {
     service.data.splice(i, 1);
    }
   }
  }


  /**
   * Get service data
   * @returns {Array}
   */
  function getData() {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request(
           'explorer.explorer@get',
           {},
           function (response)
           {
            // Attach the data
            service.data = response.data;

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
   * Get service data
   * @returns {Array}
   */
  function getComponents() {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.components@get', {},
           function (response)
           {
            // Attach the data
            service.data = response.data;

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

  return service;

 }
})();