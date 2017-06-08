(function ()
{
 'use strict';

 angular
         .module('app.matcher',
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
          .state('app.matcher', {
           url: '/matcher',
           abstract: true,
           views: {
            'content@app': {
             templateUrl: 'app/main/apps/matcher/matcher.html',
             controller: 'MatcherController as vm'
            }
           },
           bodyClass: 'matcher'
          })
          .state('app.matcher.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/matcher/tabs/home/home.html',
             controller: 'MatcherHomeTabController as vm'
            }
           },
           data: {
            'selectedTab': 0
           }
          })
          .state('app.matcher.history', {
           url: '/saved',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/matcher/tabs/history/history.html',
             controller: 'MatcherHistoryTabController as vm'
            }
           },
           data: {
            'selectedTab': 1
           }
          })
          .state('app.matcher.compare', {
           url: '/compare',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/matcher/tabs/compare/compare.html',
             controller: 'MatcherCompareTabController as vm'
            }
           },
           data: {
            'selectedTab': 2
           }
          })
          .state('app.matcher.about', {
           url: '/about',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/matcher/tabs/about/about.html',
             controller: 'MatcherAboutTabController as vm'
            }
           },
           data: {
            'selectedTab': 4
           }
          })
          .state('app.matcher.business', {
           url: '/business',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/matcher/tabs/business/business.html',
             controller: 'MatcherBusinessTabController as vm'
            }
           },
           data: {
            'selectedTab': 3
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('app/main/apps/matcher');

  // Api
  msApiProvider.register('matcher.getMatcher', ['/api/components/random']);
  msApiProvider.register('matcher.getMatcherByType', ['/api/components/random/typeid/:typeId',
   {
    typeId: '@typeId'
   }
  ]);
  msApiProvider.register('matcher.getMatchers', ['/api/components/bookmarks/:creatorId',
   {
    creatorId: "@creatorId"
   }]);
  msApiProvider.register('matcher.createMatcher', ['/api/components/create']);

 }

})();