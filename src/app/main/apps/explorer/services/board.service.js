/*
 *
 * This is a Skill Section BoardService factory which
 * connects to the backend
 */

(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .factory('BoardService', BoardService);

 /** @ngInject */
 function BoardService($q, msApi)
 {
  var service = {
   data: {},
   addNewBoard: addNewBoard,
   createComponent: createComponent,
   updateComponent: updateComponent,
   updateComponentDescription: updateComponentDescription,
   getBoards: getBoards,
   getBoardsByType: getBoardsByType,
   getBoard: getBoard,
   getRandomBoard: getRandomBoard,
   getRandomBoardByType: getRandomBoardByType,
   getCard: getCard,
   //Component Bookmarks
   getComponentBookmarks: getComponentBookmarks,
   createComponentBookmark: createComponentBookmark,
   //Component Contribution
   getContributionSuggestions: getContributionSuggestions,
   createComponentContributions: createComponentContributions,
  };


  // ******************************
  // Internal methods
  // ******************************

  /**
   * Get board data from the server
   *
   * @returns promise of the deferred response
   */
  function getBoards()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.components@get',
           function (response)
           {
            //service.data = response;
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
   * Get board data from the server
   *
   * @param appName
   * @returns promise of the deferred response
   */
  function getBoardsByType(appName)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.componentsByType@query', {appName: appName},
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
   * Get board data from the server
   *
   * @param boardId
   * @param listFormat
   * @returns promise of the deferred response
   */
  function getBoard(boardId, listFormat)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.component@get', {id: boardId, listFormat: listFormat},
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
   * Get a random board data from the server
   *
   * @returns promise of the deferred response
   */
  function getRandomBoard()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.randomComponent@get', {},
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
   * Get a random board data by its type
   *
   * @param typeId type of the board
   * @returns promise of the deferred response
   */
  function getRandomBoardByType(typeId)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.randomComponentByType@get', {typeId: typeId},
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
   * Get board data from the server
   *
   * @param boardId
   * @returns promise of the deferred response
   */
  function getCard(cardId, listFormat)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.component@get', {id: cardId, listFormat: listFormat},
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

   msApi.request('explorer.updateComponentDescription@save',
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
   * Create a Component Bookmark
   *
   * @param componentData
   * @returns promise of the deferred response
   */
  function createComponentBookmark(componentData)
  {
   // Create a new deferred object
   var deferred = $q.defer();

   msApi.request('explorer.createComponentBookmark@save', componentData,
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
   * Create an empty board object and set it. This is still
   * hard coded board and not coming from the server
   *
   */
  function addNewBoard()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   _generateEmptyExplorerObject().then(
           function (response)
           {
            // Attach the data
            service.data = response.data;
            // Resolve the response
            deferred.resolve(response);
           },
           function (response)
           {
            // Reject the response
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
     name: 'Untitled Board',
     uri: 'untitled-board',
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
       avatar: 'src/assets/images/avatars/alice.jpg'
      },
      {
       id: '26027s1930450d8bf7b10828',
       name: 'Danielle Obrien',
       avatar: 'src/assets/images/avatars/danielle.jpg'
      },
      {
       id: '76027g1930450d8bf7b10958',
       name: 'James Lewis',
       avatar: 'src/assets/images/avatars/james.jpg'
      },
      {
       id: '36027j1930450d8bf7b10158',
       name: 'Vincent Munoz',
       avatar: 'src/assets/images/avatars/vincent.jpg'
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