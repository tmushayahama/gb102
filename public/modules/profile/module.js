define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.profile', ['ui.router']);
 var profileConfig = function ($stateProvider) {

  $stateProvider
          .state('profile', {
           abstract: true,
           url: '/profile/{profileId}',
           views: {
            "root": {
             controller: 'ProfileCtrl as profileCtrl',
             templateUrl: 'public/modules/profile/views/profile.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'profile',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/profile/services/ProfileManager.js',
                  'public/modules/profile/services/UserProfileSectionManager.js',
                  'public/modules/profile/controllers/ProfileCtrl.js',
                  'public/modules/profile/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('profile.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'ProfileOverviewCtrl as profileOverviewCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/profile-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/profile/controllers/ProfileOverviewCtrl.js',
                  //Timeline
                  'public/modules/profile/services/ProfileTimelineManager.js',
                  'public/modules/profile/services/ProfileTimelinesManager.js',
                  'public/modules/profile/controllers/ProfileTimelinesCtrl.js',
                  'public/modules/profile/controllers/modals/ProfileTimelineCtrl.js',
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
             templateUrl: 'public/modules/profile/views/tabs/profile/profile-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/profile/directives/todoEscape.js',
                  'public/modules/profile/directives/todoFocus.js',
                  'public/modules/profile/services/ProfileTodoManager.js',
                  'public/modules/profile/services/ProfileTodosManager.js',
                  'public/modules/profile/services/ProfileTodoChecklistManager.js',
                  'public/modules/profile/controllers/ProfileTodosCtrl.js',
                  'public/modules/profile/controllers/modals/ProfileTodoCtrl.js',
                  //Notes,
                  'public/modules/profile/services/ProfileNoteManager.js',
                  'public/modules/profile/services/ProfileNotesManager.js',
                  'public/modules/profile/controllers/ProfileNotesCtrl.js',
                  'public/modules/profile/controllers/modals/ProfileNoteCtrl.js',
                  //Weblink
                  'public/modules/profile/services/ProfileWeblinkManager.js',
                  'public/modules/profile/services/ProfileWeblinksManager.js',
                  'public/modules/profile/controllers/ProfileWeblinksCtrl.js',
                  'public/modules/profile/controllers/modals/ProfileWeblinkCtrl.js',
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
             templateUrl: 'public/modules/profile/views/tabs/profile/profile-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/profile/services/ProfileCommentManager.js',
                  'public/modules/profile/services/ProfileCommentsManager.js',
                  'public/modules/profile/controllers/ProfileCommentsCtrl.js',
                  'public/modules/profile/controllers/modals/ProfileCommentCtrl.js',
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
