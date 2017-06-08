(function ()
{
 'use strict';

 angular
         .module('app.profile', [
          'ui.calendar',
          'app.components',
          'app.explorer'
         ])
         .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {
  $stateProvider.state('app.profile', {
   url: '/profile/{userId}',
   views: {
    'content@app': {
     templateUrl: 'app/main/profile/profile.html',
     controller: 'ProfileController as vm'
    }
   },
   bodyClass: 'profile'
  }).state('app.profileLinearView', {
   url: '/linearview/:userId',
   abstract: true,
   views: {
    'content@app': {
     templateUrl: 'app/main/profile/views/linear/profile.html',
     controller: 'ProfileLinearController as profileLinearCtrl'
    }
   }
  }).state('app.profileLinearView.home', {
   url: '/overview',
   views: {
    'tab': {
     templateUrl: 'app/main/profile/views/linear/tabs/home/home.html',
     controller: 'ProfileLinearHomeController as vm'
    }
   },
   data: {
    'selectedTab': 0
   }
  }).state('app.profileLinearView.activities', {
   url: '/activities',
   views: {
    'tab': {
     templateUrl: 'app/main/profile/views/linear/tabs/activities/activities.html',
     controller: 'ProfileLinearActivitiesController as vm'
    }
   },
   data: {
    'selectedTab': 1
   }
  }).state('app.profileLinearView.timeline', {
   url: '/timeline',
   views: {
    'tab': {
     templateUrl: 'app/main/profile/views/linear/tabs/timeline/timeline.html',
     controller: 'ProfileLinearTimelineController as vm'
    }
   },
   data: {
    'selectedTab': 2
   }
  }).state('app.profileLinearView.calendar', {
   url: '/calendar',
   views: {
    'tab': {
     templateUrl: 'app/main/profile/views/linear/tabs/calendar/calendar.html',
     controller: 'ProfileLinearCalendarController as vm'
    }
   },
   data: {
    'selectedTab': 3
   }
  }).state('app.profileLinearView.discussions', {
   url: '/discussion',
   views: {
    'tab': {
     templateUrl: 'app/main/profile/views/linear/tabs/discussions/discussions.html',
     controller: 'ProfileLinearDiscussionsController as vm'
    }
   },
   data: {
    'selectedTab': 4
   }
  }).state('app.profileLinearView.graphs', {
   url: '/graphs',
   views: {
    'tab': {
     templateUrl: 'app/main/profile/views/linear/tabs/graphs/graphs.html',
     controller: 'ProfileLinearGraphsController as vm'
    }
   },
   data: {
    'selectedTab': 5
   }
  }).state('app.profileLinearView.settings', {
   url: '/settings',
   views: {
    'tab': {
     templateUrl: 'app/main/profile/views/linear/tabs/settings/settings.html',
     controller: 'ProfileLinearSettingsController as vm'
    }
   },
   data: {
    'selectedTab': 6
   }
  });

  // Translation
  $translatePartialLoaderProvider.addPart('app/main/profile');

  // Api
  msApiProvider.register('profile.profile', ['/api/profile/:userId', {userId: "@userId"}]);

  msApiProvider.register('profile.timeline', ['app/data/profile/timeline.json']);
  msApiProvider.register('profile.about', ['app/data/profile/about.json']);
  msApiProvider.register('profile.photosVideos', ['app/data/profile/photos-videos.json']);

 }
})();