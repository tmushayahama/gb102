(function ()
{
 'use strict';

 angular
         .module('app.swipe',
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
 function config(gbConfigProvider, $stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  var apiUrl = gbConfigProvider.getConfig("apiUrl");

  $stateProvider
          .state('app.swipe', {
           url: '/swipe',
           abstract: true,
           views: {
            'content@app': {
             templateUrl: 'app/main/apps/swipe/swipe.html',
             controller: 'SwipeController as vm'
            }
           },
           bodyClass: 'swipe'
          })
          .state('app.swipe.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/swipe/tabs/home/home.html',
             controller: 'SwipeHomeTabController as vm'
            }
           },
           data: {
            'selectedTab': 0
           }
          })
          .state('app.swipe.history', {
           url: '/saved',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/swipe/tabs/history/history.html',
             controller: 'SwipeHistoryTabController as vm'
            }
           },
           data: {
            'selectedTab': 1
           }
          })
          .state('app.swipe.compare', {
           url: '/compare',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/swipe/tabs/compare/compare.html',
             controller: 'SwipeCompareTabController as vm'
            }
           },
           data: {
            'selectedTab': 2
           }
          })
          .state('app.swipe.about', {
           url: '/about',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/swipe/tabs/about/about.html',
             controller: 'SwipeAboutTabController as vm'
            }
           },
           data: {
            'selectedTab': 4
           }
          })
          .state('app.swipe.business', {
           url: '/business',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/swipe/tabs/business/business.html',
             controller: 'SwipeBusinessTabController as vm'
            }
           },
           data: {
            'selectedTab': 3
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('app/main/apps/swipe');

  // Api
  msApiProvider.register('swipe.getSwipe', [apiUrl + 'api/components/random']);
  msApiProvider.register('swipe.getSwipeByType', [apiUrl + 'api/components/random/type/:typeId',
   {
    typeId: '@typeId'
   }
  ]);
  msApiProvider.register('swipe.getSwipes', [apiUrl + 'api/components/bookmarks/:creatorId',
   {
    creatorId: "@creatorId"
   }]);
  msApiProvider.register('swipe.createSwipe', [apiUrl + 'api/components/bookmarks/create']);

 }

})();