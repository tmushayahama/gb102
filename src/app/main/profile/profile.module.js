(function ()
{
 'use strict';

 angular
         .module('app.profile', [])
         .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {
  $stateProvider.state('app.profile', {
   url: '/profile/{user_id}',
   views: {
    'content@app': {
     templateUrl: 'src/app/main/profile/profile.html',
     controller: 'ProfileController as vm'
    }
   },
   resolve: {
    Timeline: function (msApi)
    {
     return msApi.resolve('profile.timeline@get');
    },
    About: function (msApi)
    {
     return msApi.resolve('profile.about@get');
    },
    PhotosVideos: function (msApi)
    {
     return msApi.resolve('profile.photosVideos@get');
    }
   },
   bodyClass: 'profile'
  });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/profile');

  // Api
  msApiProvider.register('profile.profile', ['/api/profile/:userId', {userId: "@userId"}]);

  msApiProvider.register('profile.timeline', ['src/app/data/profile/timeline.json']);
  msApiProvider.register('profile.about', ['src/app/data/profile/about.json']);
  msApiProvider.register('profile.photosVideos', ['src/app/data/profile/photos-videos.json']);

 }
})();