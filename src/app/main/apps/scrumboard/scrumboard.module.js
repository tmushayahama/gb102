(function ()
{
 'use strict';

 angular
         .module('app.explorer',
                 [
                  // 3rd Party Dependencies
                  'moment-picker',
                  'ui.calendar',
                  'ui.sortable',
                  'xeditable'
                 ]
                 )
         .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {
  $stateProvider
          .state('app.explorer', {
           //abstract: true,
           url: '/explorer',
           resolve: {
            BoardList: function (msApi)
            {
             return msApi.resolve('explorer.components@get');
            }
           },
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/scrumboard/views/boards/boards-view.html',
             controller: 'BoardsViewController as vm'
            }
           },
           bodyClass: 'scrumboard'
          })
          .state('app.apps', {
           url: '/explorer/{app_name}',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/scrumboard/views/app-boards/app-boards-view.html',
             controller: 'AppBoardsViewController as vm'
            }
           }
          })
          .state('app.component', {
           url: '/:id',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/scrumboard/scrumboard.html',
             controller: 'ScrumboardController as vm'
            },
            'scrumboardContent@app.explorer.boards.board': {
             templateUrl: 'src/app/main/apps/scrumboard/views/board/board-view.html',
             controller: 'BoardViewController as vm'
            }
           },
           resolve: {
            BoardData: function ($stateParams, BoardService)
            {
             return BoardService.getBoard($stateParams.id, 3);
            }
           }
          }
          )

          // Add board
          .state('app.explorer.boards.addBoard', {
           url: '/add',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/scrumboard/scrumboard.html',
             controller: 'ScrumboardController as vm'
            },
            'scrumboardContent@app.explorer.boards.addBoard': {
             templateUrl: 'src/app/main/apps/scrumboard/views/board/board-view.html',
             controller: 'BoardViewController as vm'
            }
           },
           resolve: {
            BoardData: function ($stateParams, BoardService)
            {
             return BoardService.addNewBoard();
            }
           }
          }
          )

          // Calendar
          .state('app.explorer.boards.board.calendar', {
           url: '/calendar',
           views: {
            'scrumboardContent@app.explorer.boards.board': {
             templateUrl: 'src/app/main/apps/scrumboard/views/calendar/calendar-view.html',
             controller: 'CalendarViewController as vm'
            }
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/scrumboard');

  // Api
  msApiProvider.register('explorer.component', ['/api/components/:id/listformat/:listFormat',
   {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('explorer.createComponent', ['/api/component/create']);
  msApiProvider.register('explorer.components', ['/api/components/listformat/2']);
  msApiProvider.register('explorer.componentsByType', ['api/components/listformat/1/type/:appName',
   {
    appName: '@appName'
   }]);

 }

})();