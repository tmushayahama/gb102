(function ()
{
 'use strict';

 angular
         .module('app.swipe',
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
          .state('app.swipe', {
           //abstract: true,
           url: '/swipe',
           resolve: {
            BoardList: function (msApi)
            {
             return msApi.resolve('swipe.components@get');
            }
           },
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/swipe/views/boards/boards-view.html',
             controller: 'SwipeHistoryController as vm'
            }
           },
           bodyClass: 'swipe'
          })

          // Calendar
          .state('app.swipe.boards.board.calendar', {
           url: '/calendar',
           views: {
            'swipeContent@app.swipe.boards.board': {
             templateUrl: 'src/app/main/apps/swipe/views/calendar/calendar-view.html',
             controller: 'CalendarViewController as vm'
            }
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/swipe');

  // Api
  msApiProvider.register('swipe.component', ['/api/components/:id/listformat/:listFormat',
   {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('swipe.createComponent', ['/api/component/create']);
  msApiProvider.register('swipe.components', ['/api/components/listformat/2']);
  msApiProvider.register('swipe.componentsByType', ['api/components/listformat/1/type/:appName',
   {
    appName: '@appName'
   }]);
 }

})();