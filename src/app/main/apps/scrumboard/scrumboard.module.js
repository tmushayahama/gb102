(function ()
{
 'use strict';

 angular
         .module('app.scrumboard',
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
          .state('app.scrumboard', {
           abstract: true,
           url: '/scrumboard',
           resolve: {
            BoardList: function (msApi)
            {
             return msApi.resolve('explorer.components@get');
            }
           },
           bodyClass: 'scrumboard'
          })

          // Home
          .state('app.scrumboard.boards', {
           url: '/boards',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/scrumboard/views/boards/boards-view.html',
             controller: 'BoardsViewController as vm'
            }
           }
          })

          // Board
          .state('app.scrumboard.boards.board', {
           url: '/:id',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/scrumboard/scrumboard.html',
             controller: 'ScrumboardController as vm'
            },
            'scrumboardContent@app.scrumboard.boards.board': {
             templateUrl: 'src/app/main/apps/scrumboard/views/board/board-view.html',
             controller: 'BoardViewController as vm'
            }
           },
           resolve: {
            BoardData: function ($stateParams, BoardService)
            {
             return BoardService.getBoardData($stateParams.id);
            }
           }
          }
          )

          // Add board
          .state('app.scrumboard.boards.addBoard', {
           url: '/add',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/scrumboard/scrumboard.html',
             controller: 'ScrumboardController as vm'
            },
            'scrumboardContent@app.scrumboard.boards.addBoard': {
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
          .state('app.scrumboard.boards.board.calendar', {
           url: '/calendar',
           views: {
            'scrumboardContent@app.scrumboard.boards.board': {
             templateUrl: 'src/app/main/apps/scrumboard/views/calendar/calendar-view.html',
             controller: 'CalendarViewController as vm'
            }
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/scrumboard');

  // Api
  msApiProvider.register('explorer.component', ['/api/components/:id/listformat/3', {id: "@id"}]);
  msApiProvider.register('explorer.createComponent', ['/api/component/create']);
  msApiProvider.register('explorer.components', ['/api/components/listformat/2']);
  msApiProvider.register('scrumboard.boardList', ['src/app/data/scrumboard/board-list.json']);
  msApiProvider.register('scrumboard.board', ['src/app/data/scrumboard/boards/:id.json']);

  // Navigation
  msNavigationServiceProvider.saveItem('apps.scrumboard', {
   title: 'Scrumboard',
   icon: 'icon-trello',
   state: 'app.scrumboard.boards',
   weight: 8
  });
 }

})();