(function ()
{
 'use strict';

 angular
         .module('app.mentorship',
                 [
                  'app.components',
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
          .state('app.mentorship', {
           url: '/mentorship',
           abstract: true,
           views: {
            'content@app': {
             templateUrl: 'app/main/apps/mentorship/views/mentorships/mentorships.html',
             controller: 'MentorshipController as mentorshipsCtrl'
            }
           },
           bodyClass: 'mentorship'
          })
          .state('app.mentorship.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/mentorship/tabs/home/home.html',
             controller: 'MentorshipHomeTabController as vm'
            }
           },
           data: {
            'selectedTab': 0
           }
          })
          .state('app.mentorship.swipe', {
           url: '/swipe',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/mentorship/tabs/swipe/swipe.html',
             controller: 'MentorshipSwipeTabController as vm'
            }
           },
           data: {
            'selectedTab': 1
           }
          })
          .state('app.mentorship.matcher', {
           url: '/matcher',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/mentorship/tabs/matcher/matcher.html',
             controller: 'MentorshipMatcherTabController as vm'
            }
           },
           data: {
            'selectedTab': 2
           }
          })
          .state('app.mentorship.business', {
           url: '/business',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/mentorship/tabs/business/business.html',
             controller: 'MentorshipBusinessTabController as vm'
            }
           },
           data: {
            'selectedTab': 3
           }
          })
          .state('app.mentorship.mentorship', {
           url: '/mentorship',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/mentorship/tabs/mentorship/mentorship.html',
             controller: 'MentorshipMentorshipTabController as vm'
            }
           },
           data: {
            'selectedTab': 4
           }
          })


          .state('app.mentorshipColumnView', {
           url: '/mentorship/boardview/:id',
           views: {
            'content@app': {
             templateUrl: 'app/main/apps/mentorship/mentorship.html',
             controller: 'MentorshipController as vm'
            },
            'mentorshipContent@app.mentorshipColumnView': {
             templateUrl: 'app/main/apps/mentorship/views/mentorship/column/mentorship.html',
             controller: 'MentorshipColumnController as vm'
            }
           }
          })
          .state('app.mentorshipLinearView', {
           url: '/mentorship/linearview/:id',
           abstract: true,
           views: {
            'content@app': {
             templateUrl: 'app/main/apps/mentorship/views/component/linear/mentorship.html',
             controller: 'MentorshipLinearController as mentorshipLinearCtrl'
            }
           }
          })
          .state('app.mentorshipLinearView.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/mentorship/views/component/linear/tabs/home/home.html',
             controller: 'MentorshipLinearHomeController as vm'
            }
           },
           data: {
            'selectedTab': 0
           }
          })
          .state('app.mentorshipLinearView.mentor', {
           url: '/mentor',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/mentorship/views/component/linear/tabs/mentor/mentor.html',
             controller: 'MentorshipLinearMentorController as vm'
            }
           },
           data: {
            'selectedTab': 1
           }
          })
          .state('app.mentorshipLinearView.mentee', {
           url: '/mentee',
           views: {
            'tab': {
             templateUrl: 'app/main/apps/mentorship/views/component/linear/tabs/mentee/mentee.html',
             controller: 'MentorshipLinearMenteeController as vm'
            }
           },
           data: {
            'selectedTab': 2
           }
          })
          .state('app.mentorshipRowView', {
           url: '/mentorship/rowview/:id',
           views: {
            'content@app': {
             templateUrl: 'app/main/apps/mentorship/mentorship.html',
             controller: 'MentorshipController as vm'
            },
            'mentorshipContent@app.mentorshipColumnView': {
             templateUrl: 'app/main/apps/mentorship/views/mentorship/row/mentorship.html',
             controller: 'MentorshipRowController as vm'
            }
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('app/main/apps/mentorship');

  // Api
  msApiProvider.register('mentorship.mentorship', [apiUrl + 'api/mentorship/:id/listformat/:listFormat',
   {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('mentorship.createMentorship', [apiUrl + 'api/mentorships/create']);
  msApiProvider.register('mentorship.updateMentorship', [apiUrl + 'api/mentorships/update']);
  msApiProvider.register('mentorship.updateMentorshipDescription', [apiUrl + 'api/mentorships/:mentorshipId/update/description', {
    mentorshipId: "@mentorshipId",
   }]);
  msApiProvider.register('mentorship.updateMentorshipBackground', [apiUrl + 'api/mentorships/:mentorshipId/update/background', {
    mentorshipId: "@mentorshipId",
   }]);
  msApiProvider.register('mentorship.mentorships', [apiUrl + 'api/mentorships/listformat/:listFormat',
   {
    listFormat: "@listFormat"
   }]);
  msApiProvider.register('mentorship.mentorshipApp', ['api/mentorships/app/:appName',
   {
    appName: '@appName'
   }]);
  msApiProvider.register('mentorship.mentorshipsByType', ['api/mentorships/listformat/1/type/:appName',
   {
    appName: '@appName'
   }]);
  msApiProvider.register('mentorship.randomMentorshipByType', [apiUrl + 'api/mentorships/random/type/:typeId',
   {
    typeId: '@typeId'
   }
  ]);
  msApiProvider.register('mentorship.randomMentorship', [apiUrl + 'api/mentorships/random']);

  /*Mentorship Request*/
  msApiProvider.register('mentorship.getRequestSuggestions', ['api/mentorships/:mentorshipId/request/type/:typeId/suggestions',
   {
    mentorshipId: "@mentorshipId",
    typeId: "@typeId"
   }]);
  msApiProvider.register('mentorship.createMentorshipRequests', [apiUrl + 'api/mentorships/requests/create']);


  /*Mentorship Bookmarks*/
  msApiProvider.register('mentorship.getMentorshipBookmarks', [apiUrl + 'api/mentorships/bookmarks/:creatorId',
   {
    creatorId: "@creatorId"
   }]);
  msApiProvider.register('mentorship.createMentorshipBookmark', [apiUrl + 'api/mentorships/bookmarks/create']);
  /*User Mentorship*/
  msApiProvider.register('mentorship.userMentorships', [apiUrl + 'api/mentorships/user/:userId/listformat/:listFormat',
   {
    userId: "@userId",
    listFormat: "@listFormat"
   }]);
 }

})();