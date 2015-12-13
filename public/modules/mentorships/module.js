define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";
 var module = angular.module('app.mentorships', ['ui.router']);
 module.config(function ($stateProvider) {

  $stateProvider
          .state('apps.mentorships', {
           url: '/mentorships',
           views: {
            "apps": {
             controller: 'MentorshipsCtrl as mentorshipsCtrl',
             templateUrl: 'public/modules/mentorships/views/mentorships.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorships',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/mentorships/services/MentorshipsManager.js',
                  'public/modules/mentorships/controllers/MentorshipsCtrl.js',
                  'public/modules/mentorships/controllers/modals/AddMentorshipCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.mentorship', {
           abstract: true,
           url: '/mentorship/{mentorshipId}',
           views: {
            "apps": {
             controller: 'MentorshipCtrl as mentorshipCtrl',
             templateUrl: 'public/modules/mentorships/views/mentorship.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorships',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/mentorships/services/MentorshipManager.js',
                  'public/modules/mentorships/controllers/MentorshipCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.mentorship.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'MentorshipOverviewCtrl as mentorshipOverviewCtrl',
             templateUrl: 'public/modules/mentorships/views/mentorship-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorships',
                 serie: true,
                 files: [
                  'public/modules/mentorships/controllers/MentorshipOverviewCtrl.js',
                  //Timeline
                  'public/modules/mentorships/services/MentorshipTimelineManager.js',
                  'public/modules/mentorships/services/MentorshipTimelinesManager.js',
                  'public/modules/mentorships/controllers/MentorshipTimelinesCtrl.js',
                  'public/modules/mentorships/controllers/modals/MentorshipTimelineCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.mentorship.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'MentorshipTodosCtrl as mentorshipTodosCtrl',
             templateUrl: 'public/modules/mentorships/views/mentorship-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorships',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/mentorships/directives/todoEscape.js',
                  'public/modules/mentorships/directives/todoFocus.js',
                  'public/modules/mentorships/services/MentorshipTodoManager.js',
                  'public/modules/mentorships/services/MentorshipTodosManager.js',
                  'public/modules/mentorships/services/MentorshipTodoChecklistManager.js',
                  'public/modules/mentorships/controllers/MentorshipTodosCtrl.js',
                  'public/modules/mentorships/controllers/modals/MentorshipTodoCtrl.js',
                  //Notes,
                  'public/modules/mentorships/services/MentorshipNoteManager.js',
                  'public/modules/mentorships/services/MentorshipNotesManager.js',
                  'public/modules/mentorships/controllers/MentorshipNotesCtrl.js',
                  'public/modules/mentorships/controllers/modals/MentorshipNoteCtrl.js',
                  //Weblink
                  'public/modules/mentorships/services/MentorshipWeblinkManager.js',
                  'public/modules/mentorships/services/MentorshipWeblinksManager.js',
                  'public/modules/mentorships/controllers/MentorshipWeblinksCtrl.js',
                  'public/modules/mentorships/controllers/modals/MentorshipWeblinkCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.mentorship.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'MentorshipNotesCtrl as mentorshipNotesCtrl',
             templateUrl: 'public/modules/mentorships/views/mentorship-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorships',
                 serie: true,
                 files: [
                  'public/modules/mentorships/services/MentorshipCommentManager.js',
                  'public/modules/mentorships/services/MentorshipCommentsManager.js',
                  'public/modules/mentorships/controllers/MentorshipCommentsCtrl.js',
                  'public/modules/mentorships/controllers/modals/MentorshipCommentCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
  /*
   .state('apps.mentorship.management', {
   url: '/tools',
   views: {
   "content": {
   //controller: 'MentorshipTodosCtrl as mentorshipTodosCtrl',
   templateUrl: 'public/modules/mentorships/views/mentorship-managements.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.mentorships',
   serie: true,
   files: [
   //Todos
   'public/modules/mentorships/directives/todoEscape.js',
   'public/modules/mentorships/directives/todoFocus.js',
   'public/modules/mentorships/4services/MentorshipTodoManager.js',
   'public/modules/mentorships/services/MentorshipTodosManager.js',
   'public/modules/mentorships/services/MentorshipTodoChecklistManager.js',
   'public/modules/mentorships/controllers/MentorshipTodosCtrl.js',
   'public/modules/mentorships/controllers/modals/MentorshipTodoCtrl.js',
   //Notes,
   'public/modules/mentorships/services/MentorshipNoteManager.js',
   'public/modules/mentorships/services/MentorshipNotesManager.js',
   'public/modules/mentorships/controllers/MentorshipNotesCtrl.js',
   'public/modules/mentorships/controllers/modals/MentorshipNoteCtrl.js',
   //Weblink
   'public/modules/mentorships/services/MentorshipWeblinkManager.js',
   'public/modules/mentorships/services/MentorshipWeblinksManager.js',
   'public/modules/mentorships/controllers/MentorshipWeblinksCtrl.js',
   'public/modules/mentorships/controllers/modals/MentorshipWeblinkCtrl.js',
   'public/css/ss_themes/ss_theme_1.css'
   ]
   })
   }]
   }
   }
   }})*/
 });
 return module;
});