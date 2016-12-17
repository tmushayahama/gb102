(function ()
{
 'use strict';

 angular
         .module('app.matcher',
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
          .state('app.matcher', {
           //abstract: true,
           url: '/matcher',
           resolve: {
            BoardList: function (msApi)
            {
             return msApi.resolve('matcher.components@get');
            }
           },
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/matcher/matcher.html',
             controller: 'MatcherController as vm'
            }
           },
           bodyClass: 'matcher'
          })

          // Calendar
          .state('app.matcher.boards.board.calendar', {
           url: '/calendar',
           views: {
            'matcherContent@app.matcher.boards.board': {
             templateUrl: 'src/app/main/apps/matcher/views/calendar/calendar-view.html',
             controller: 'CalendarViewController as vm'
            }
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/matcher');

  // Api
  msApiProvider.register('matcher.component', ['/api/components/:id/listformat/:listFormat',
   {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('matcher.createComponent', ['/api/component/create']);
  msApiProvider.register('matcher.components', ['/api/components/listformat/2']);
  msApiProvider.register('matcher.componentsByType', ['api/components/listformat/1/type/:appName',
   {
    appName: '@appName'
   }]);
 }

})();