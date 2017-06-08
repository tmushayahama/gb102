/*
 *
 * This is a Skill Section ComponentService factory which
 * connects to the backend ad serves as a model
 */

(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .factory('ExplorerService', ExplorerService);

 /** @ngInject */
 function ExplorerService($q, msApi) {
  var service = {
   //Data
   data: {},
   ////////
   //
   //Methods
   createComponent: createComponent,
   updateComponent: updateComponent,
   updateComponentDescription: updateComponentDescription,
   getComponents: getComponents,
   getComponentsByType: getComponentsByType,
   getComponent: getComponent,
   getComponentApp: getComponentApp,
   getRandomComponent: getRandomComponent,
   getRandomComponentByType: getRandomComponentByType,
   getCard: getCard,
   /*Component Bookmarks*/
   getComponentBookmarks: getComponentBookmarks,
   createComponentBookmark: createComponentBookmark,
   //Component Contribution
   getContributionSuggestions: getContributionSuggestions,
   createComponentContributions: createComponentContributions,
   //User Components
   getUserComponents: getUserComponents,
   ////////
  };


  // ******************************
  // Internal Methods
  // ******************************

  /**
   * Get component data from the server
   *
   * @returns promise of the deferred response
   */
  function getComponents(listFormat) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.components@get', {listFormat: listFormat},
           function (response) {
            //service.data = response;
            deferred.resolve(response);
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

   msApi.request('explorer.componentsByType@query', {appName: appName},
           function (response) {
            deferred.resolve(response);
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

   msApi.request('explorer.component@get', {id: componentId, listFormat: listFormat},
           function (response) {
            deferred.resolve(response);
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
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.componentApp@get', {appName: appName},
           function (response) {
            deferred.resolve(response);
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

   msApi.request('explorer.randomComponent@get', {},
           function (response) {
            deferred.resolve(response);
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

   msApi.request('explorer.randomComponentByType@get', {typeId: typeId},
           function (response) {
            deferred.resolve(response);
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
   * @returns promise of the deferred response
   */
  function getCard(cardId, listFormat) {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.component@get', {id: cardId, listFormat: listFormat},
           function (response) {
            deferred.resolve(response);
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
  function createComponent(componentData)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.createComponent@save', componentData,
           function (response) {
            deferred.resolve(response);
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

   msApi.request('explorer.updateComponent@save', componentData,
           function (response) {
            deferred.resolve(response);
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

   msApi.request('explorer.updateComponentDescription@save',
           componentData,
           function (response) {
            deferred.resolve(response);
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

   msApi.request('explorer.getContributionSuggestions@query',
           {
            componentId: componentId,
            typeId: typeId
           },
           function (response) {
            deferred.resolve(response);
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
  function createComponentContributions(componentContributionData)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.createComponentContributions@save', componentContributionData,
           function (response) {
            deferred.resolve(response);
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
  function getComponentBookmarks(creatorId)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.getComponentBookmarks@query', {creatorId: creatorId},
           function (response) {
            deferred.resolve(response);
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

   msApi.request('explorer.createComponentBookmark@save', componentData,
           function (response) {
            deferred.resolve(response);
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
  function getUserComponents(userId, listFormat)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.userComponents@get', {userId: userId, listFormat: listFormat},
           function (response) {
            deferred.resolve(response);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Create an empty component object and set it. This is still
   * hard coded component and not coming from the server
   *
   */
  function addNewComponent()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   _generateEmptyExplorerObject().then(
           function (response) {
            service.data = response.data;
            deferred.resolve(response);
           },
           function (response) {
            deferred.reject(response);
           }
   );

   return deferred.promise;
  }

  /**
   * Dummy function for generating an empty
   * explorer object for demonstration
   * purposes
   *
   * @private
   * returns {$promise}
   */
  function _generateEmptyExplorerObject()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   // Fake id generator
   var id = parseInt(new Date().valueOf(), 16);

   // Prepare an empty explorer object
   var emptyObject = {
    data: {
     name: 'Untitled Component',
     uri: 'untitled-component',
     id: id,
     settings: {
      color: '',
      subscribed: false,
      cardCoverImages: true
     },
     lists: [],
     cards: [],
     members: [
      {
       id: '56027c1930450d8bf7b10758',
       name: 'Alice Freeman',
       avatar: 'assets/images/avatars/alice.jpg'
      },
      {
       id: '26027s1930450d8bf7b10828',
       name: 'Danielle Obrien',
       avatar: 'assets/images/avatars/danielle.jpg'
      },
      {
       id: '76027g1930450d8bf7b10958',
       name: 'James Lewis',
       avatar: 'assets/images/avatars/james.jpg'
      },
      {
       id: '36027j1930450d8bf7b10158',
       name: 'Vincent Munoz',
       avatar: 'assets/images/avatars/vincent.jpg'
      }
     ],
     labels: [
      {
       id: '26022e4129ad3a5sc28b36cd',
       name: 'High Priority',
       color: 'red'
      },
      {
       id: '56027e4119ad3a5dc28b36cd',
       name: 'Design',
       color: 'orange'
      },
      {
       id: '5640635e19ad3a5dc21416b2',
       name: 'App',
       color: 'blue'
      },
      {
       id: '6540635g19ad3s5dc31412b2',
       name: 'Feature',
       color: 'green'
      }
     ]
    }
   };

   // Resolve the promise
   deferred.resolve(emptyObject);

   return deferred.promise;
  }

  return service;
 }
})();