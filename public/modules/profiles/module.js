define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.profiles', ['ui.router']);
 var profileConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.profiles', {
           url: '/profiles',
           abstract: true,
           views: {
            "apps": {
             controller: 'ProfilesCtrl as profilesCtrl',
             templateUrl: 'public/modules/profiles/views/profiles.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profiles',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/profiles/services/ProfilesManager.js',
                  'public/modules/profiles/controllers/ProfilesCtrl.js',
                  'public/modules/profiles/controllers/modals/AddProfileCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.profiles.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'ProfilesAllCtrl as profilesTabCtrl',
             templateUrl: 'public/modules/profiles/views/tabs/profiles/profile-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profiles',
                 serie: true,
                 files: [
                  'public/modules/profiles/controllers/ProfilesAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profiles.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'ProfilesMineCtrl as profilesTabCtrl',
             templateUrl: 'public/modules/profiles/views/tabs/profiles/profile-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profiles',
                 serie: true,
                 files: [
                  'public/modules/profiles/controllers/ProfilesMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profiles.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'ProfileSwipesCtrl as profileSwipesCtrl',
             templateUrl: 'public/modules/profiles/views/tabs/profiles/profile-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profiles',
                 serie: true,
                 files: [
                  'public/modules/profiles/controllers/ProfileSwipesCtrl.js',
                  'public/modules/profiles/services/ProfileSwipesManager.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile', {
           abstract: true,
           url: '/profile/{profileId}',
           views: {
            "apps": {
             controller: 'ProfileCtrl as profileCtrl',
             templateUrl: 'public/modules/profiles/views/profile.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profiles',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/profiles/services/ProfileManager.js',
                  'public/modules/profiles/controllers/ProfileCtrl.js',
                  'public/modules/profiles/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'ProfileOverviewCtrl as profileOverviewCtrl',
             templateUrl: 'public/modules/profiles/views/tabs/profile/profile-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profiles',
                 serie: true,
                 files: [
                  'public/modules/profiles/controllers/ProfileOverviewCtrl.js',
                  //Timeline
                  'public/modules/profiles/services/ProfileTimelineManager.js',
                  'public/modules/profiles/services/ProfileTimelinesManager.js',
                  'public/modules/profiles/controllers/ProfileTimelinesCtrl.js',
                  'public/modules/profiles/controllers/modals/ProfileTimelineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'ProfileTodosCtrl as profileTodosCtrl',
             templateUrl: 'public/modules/profiles/views/tabs/profile/profile-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profiles',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/profiles/directives/todoEscape.js',
                  'public/modules/profiles/directives/todoFocus.js',
                  'public/modules/profiles/services/ProfileTodoManager.js',
                  'public/modules/profiles/services/ProfileTodosManager.js',
                  'public/modules/profiles/services/ProfileTodoChecklistManager.js',
                  'public/modules/profiles/controllers/ProfileTodosCtrl.js',
                  'public/modules/profiles/controllers/modals/ProfileTodoCtrl.js',
                  //Notes,
                  'public/modules/profiles/services/ProfileNoteManager.js',
                  'public/modules/profiles/services/ProfileNotesManager.js',
                  'public/modules/profiles/controllers/ProfileNotesCtrl.js',
                  'public/modules/profiles/controllers/modals/ProfileNoteCtrl.js',
                  //Weblink
                  'public/modules/profiles/services/ProfileWeblinkManager.js',
                  'public/modules/profiles/services/ProfileWeblinksManager.js',
                  'public/modules/profiles/controllers/ProfileWeblinksCtrl.js',
                  'public/modules/profiles/controllers/modals/ProfileWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'ProfileNotesCtrl as profileNotesCtrl',
             templateUrl: 'public/modules/profiles/views/tabs/profile/profile-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profiles',
                 serie: true,
                 files: [
                  'public/modules/profiles/services/ProfileCommentManager.js',
                  'public/modules/profiles/services/ProfileCommentsManager.js',
                  'public/modules/profiles/controllers/ProfileCommentsCtrl.js',
                  'public/modules/profiles/controllers/modals/ProfileCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 profileConfig.$inject = ['$stateProvider'];

 module.config(profileConfig);

 return module;
});
