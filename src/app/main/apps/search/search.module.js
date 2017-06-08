(function ()
{
 'use strict';

 angular
         .module('app.search',
                 [
                  "app.components",
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
          .state('app.search', {
           url: '/search',
           abstract: true,
           views: {
            'content@app': {
             templateUrl: 'app/main/apps/search/search.html',
             controller: 'SearchController as vm'
            }
           },
           bodyClass: 'search'
          })
          .state('app.search.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/search/tabs/home/home.html',
             controller: 'SearchHomeTabController as vm'
            }
           },
           data: {
            'selectedTab': 0
           }
          })
          .state('app.search.history', {
           url: '/saved',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/search/tabs/history/history.html',
             controller: 'SearchHistoryTabController as vm'
            }
           },
           data: {
            'selectedTab': 1
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('app/main/apps/search');

  // Api
  msApiProvider.register('search.suggestionSearch', ['/api/search/suggestion/keyword/:keyword', {
    keyword: '@keyword'
   }
  ]);
  msApiProvider.register('search.keywordSearch', ['/api/search/keyword/:keyword', {
    keyword: '@keyword'
   }
  ]);
  msApiProvider.register('search.searchByType', ['/api/search/keyword/:keyword/type/:typeId', {
    keyword: '@keyword',
    typeId: '@typeId'
   }
  ]);
 }

})();