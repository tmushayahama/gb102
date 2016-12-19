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
           url: '/explorer',
           abstract: true,
           resolve: {
            BoardList: function (msApi)
            {
             return msApi.resolve('explorer.components@get');
            }
           },
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/explorer/views/boards/boards-view.html',
             controller: 'BoardsViewController as vm'
            }
           },
           bodyClass: 'explorer'
          })
          .state('app.explorer.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/explorer/tabs/home/home.html',
             controller: 'BoardsHomeTabController as vm'
            }
           },
           data: {
            'selectedTab': 0
           }
           //bodyClass: 'explorer'
          })
          .state('app.apps', {
           url: '/explorer/{app_name}',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/explorer/views/app-boards/app-boards-view.html',
             controller: 'AppBoardsViewController as vm'
            }
           }
          })
          .state('app.componentColumnView', {
           url: '/component/boardview/:id',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/explorer/explorer.html',
             controller: 'ExplorerController as vm'
            },
            'explorerContent@app.componentColumnView': {
             templateUrl: 'src/app/main/apps/explorer/views/component/column/component.html',
             controller: 'ComponentColumnController as vm'
            }
           }
          })
          .state('app.componentLinearView', {
           url: '/component/linearview/:id',
           abstract: true,
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/explorer/views/component/linear/component.html',
             controller: 'ComponentLinearController as componentLinearCtrl'
            }
           }
          })
          .state('app.componentLinearView.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/explorer/views/component/linear/tabs/home/home.html',
             controller: 'ComponentLinearHomeController as vm'
            }
           },
           data: {
            'selectedTab': 0
           }
          })
          .state('app.componentRowView', {
           url: '/component/rowview/:id',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/explorer/explorer.html',
             controller: 'ExplorerController as vm'
            },
            'explorerContent@app.componentColumnView': {
             templateUrl: 'src/app/main/apps/explorer/views/component/row/component.html',
             controller: 'ComponentRowController as vm'
            }
           }
          })

          // Add board
          .state('app.explorer.boards.addBoard', {
           url: '/add',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/explorer/explorer.html',
             controller: 'ExplorerController as vm'
            },
            'explorerContent@app.explorer.boards.addBoard': {
             templateUrl: 'src/app/main/apps/explorer/views/board/board-view.html',
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
            'explorerContent@app.explorer.boards.board': {
             templateUrl: 'src/app/main/apps/explorer/views/calendar/calendar-view.html',
             controller: 'CalendarViewController as vm'
            }
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/explorer');

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