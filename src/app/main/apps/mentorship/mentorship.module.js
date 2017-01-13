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
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {
  $stateProvider
          .state('app.mentorship', {
           url: '/mentorship',
           abstract: true,
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorships/mentorships.html',
             controller: 'MentorshipController as mentorshipsCtrl'
            }
           },
           bodyClass: 'mentorship'
          })
          .state('app.mentorship.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/mentorship/tabs/home/home.html',
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
             templateUrl: 'src/app/main/apps/mentorship/tabs/swipe/swipe.html',
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
             templateUrl: 'src/app/main/apps/mentorship/tabs/matcher/matcher.html',
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
             templateUrl: 'src/app/main/apps/mentorship/tabs/business/business.html',
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
             templateUrl: 'src/app/main/apps/mentorship/tabs/mentorship/mentorship.html',
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
             templateUrl: 'src/app/main/apps/mentorship/mentorship.html',
             controller: 'MentorshipController as vm'
            },
            'mentorshipContent@app.mentorshipColumnView': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/column/mentorship.html',
             controller: 'MentorshipColumnController as vm'
            }
           }
          })
          .state('app.mentorshipLinearView', {
           url: '/mentorship/linearview/:id',
           abstract: true,
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/linear/mentorship.html',
             controller: 'MentorshipLinearController as mentorshipLinearCtrl'
            }
           }
          })
          .state('app.mentorshipLinearView.home', {
           url: '/overview',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/linear/tabs/home/home.html',
             controller: 'MentorshipLinearHomeController as vm'
            }
           },
           data: {
            'selectedTab': 0
           }
          })
          .state('app.mentorshipLinearView.activities', {
           url: '/activities',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/linear/tabs/activities/activities.html',
             controller: 'MentorshipLinearActivitiesController as vm'
            }
           },
           data: {
            'selectedTab': 1
           }
          })
          .state('app.mentorshipLinearView.timeline', {
           url: '/timeline',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/linear/tabs/timeline/timeline.html',
             controller: 'MentorshipLinearTimelineController as vm'
            }
           },
           data: {
            'selectedTab': 2
           }
          })
          .state('app.mentorshipLinearView.calendar', {
           url: '/calendar',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/linear/tabs/calendar/calendar.html',
             controller: 'MentorshipLinearCalendarController as vm'
            }
           },
           data: {
            'selectedTab': 3
           }
          })
          .state('app.mentorshipLinearView.discussions', {
           url: '/discussion',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/linear/tabs/discussions/discussions.html',
             controller: 'MentorshipLinearDiscussionsController as vm'
            }
           },
           data: {
            'selectedTab': 4
           }
          })
          .state('app.mentorshipLinearView.graphs', {
           url: '/graphs',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/linear/tabs/graphs/graphs.html',
             controller: 'MentorshipLinearGraphsController as vm'
            }
           },
           data: {
            'selectedTab': 5
           }
          })
          .state('app.mentorshipLinearView.settings', {
           url: '/settings',
           views: {
            'tab': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/linear/tabs/settings/settings.html',
             controller: 'MentorshipLinearSettingsController as vm'
            }
           },
           data: {
            'selectedTab': 6
           }
          })
          .state('app.mentorshipRowView', {
           url: '/mentorship/rowview/:id',
           views: {
            'content@app': {
             templateUrl: 'src/app/main/apps/mentorship/mentorship.html',
             controller: 'MentorshipController as vm'
            },
            'mentorshipContent@app.mentorshipColumnView': {
             templateUrl: 'src/app/main/apps/mentorship/views/mentorship/row/mentorship.html',
             controller: 'MentorshipRowController as vm'
            }
           }
          });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/mentorship');

  // Api
  msApiProvider.register('mentorship.mentorship', ['/api/mentorships/:id/listformat/:listFormat',
   {
    id: "@id",
    listformat: "@listformat"
   }]);
  msApiProvider.register('mentorship.createMentorship', ['/api/mentorships/create']);
  msApiProvider.register('mentorship.updateMentorship', ['/api/mentorships/update']);
  msApiProvider.register('mentorship.updateMentorshipDescription', ['/api/mentorships/:mentorshipId/update/description', {
    mentorshipId: "@mentorshipId",
   }]);
  msApiProvider.register('mentorship.updateMentorshipBackground', ['/api/mentorships/:mentorshipId/update/background', {
    mentorshipId: "@mentorshipId",
   }]);
  msApiProvider.register('mentorship.mentorships', ['/api/mentorships/listformat/:listFormat',
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
  msApiProvider.register('mentorship.randomMentorshipByType', ['/api/mentorships/random/type/:typeId',
   {
    typeId: '@typeId'
   }
  ]);
  msApiProvider.register('mentorship.randomMentorship', ['/api/mentorships/random']);

  /*Mentorship Request*/
  msApiProvider.register('mentorship.getRequestSuggestions', ['api/mentorships/:mentorshipId/request/type/:typeId/suggestions',
   {
    mentorshipId: "@mentorshipId",
    typeId: "@typeId"
   }]);
  msApiProvider.register('mentorship.createMentorshipRequests', ['/api/mentorships/requests/create']);


  /*Mentorship Bookmarks*/
  msApiProvider.register('mentorship.getMentorshipBookmarks', ['/api/mentorships/bookmarks/:creatorId',
   {
    creatorId: "@creatorId"
   }]);
  msApiProvider.register('mentorship.createMentorshipBookmark', ['/api/mentorships/bookmarks/create']);
  /*User Mentorship*/
  msApiProvider.register('mentorship.userMentorships', ['/api/mentorships/user/:userId/listformat/:listFormat',
   {
    userId: "@userId",
    listFormat: "@listFormat"
   }]);
 }

})();