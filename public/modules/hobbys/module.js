define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";
 var module = angular.module('app.hobbys', ['ui.router']);
 module.config(function ($stateProvider) {

  $stateProvider
          .state('apps.hobbys', {
           url: '/hobbys',
           views: {
            "apps": {
             controller: 'HobbysCtrl as hobbysCtrl',
             templateUrl: 'public/modules/hobbys/views/hobbys.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.hobbys',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/hobbys/services/HobbysManager.js',
                  'public/modules/hobbys/controllers/HobbysCtrl.js',
                  'public/modules/hobbys/controllers/modals/AddHobbyCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.hobby', {
           abstract: true,
           url: '/hobby/{hobbyId}',
           views: {
            "apps": {
             controller: 'HobbyCtrl as hobbyCtrl',
             templateUrl: 'public/modules/hobbys/views/hobby.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.hobbys',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/hobbys/services/HobbyManager.js',
                  'public/modules/hobbys/controllers/HobbyCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.hobby.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'HobbyOverviewCtrl as hobbyOverviewCtrl',
             templateUrl: 'public/modules/hobbys/views/hobby-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.hobbys',
                 serie: true,
                 files: [
                  'public/modules/hobbys/controllers/HobbyOverviewCtrl.js',
                  //Timeline
                  'public/modules/hobbys/services/HobbyTimelineManager.js',
                  'public/modules/hobbys/services/HobbyTimelinesManager.js',
                  'public/modules/hobbys/controllers/HobbyTimelinesCtrl.js',
                  'public/modules/hobbys/controllers/modals/HobbyTimelineCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.hobby.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'HobbyTodosCtrl as hobbyTodosCtrl',
             templateUrl: 'public/modules/hobbys/views/hobby-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.hobbys',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/hobbys/directives/todoEscape.js',
                  'public/modules/hobbys/directives/todoFocus.js',
                  'public/modules/hobbys/services/HobbyTodoManager.js',
                  'public/modules/hobbys/services/HobbyTodosManager.js',
                  'public/modules/hobbys/services/HobbyTodoChecklistManager.js',
                  'public/modules/hobbys/controllers/HobbyTodosCtrl.js',
                  'public/modules/hobbys/controllers/modals/HobbyTodoCtrl.js',
                  //Notes,
                  'public/modules/hobbys/services/HobbyNoteManager.js',
                  'public/modules/hobbys/services/HobbyNotesManager.js',
                  'public/modules/hobbys/controllers/HobbyNotesCtrl.js',
                  'public/modules/hobbys/controllers/modals/HobbyNoteCtrl.js',
                  //Weblink
                  'public/modules/hobbys/services/HobbyWeblinkManager.js',
                  'public/modules/hobbys/services/HobbyWeblinksManager.js',
                  'public/modules/hobbys/controllers/HobbyWeblinksCtrl.js',
                  'public/modules/hobbys/controllers/modals/HobbyWeblinkCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.hobby.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'HobbyNotesCtrl as hobbyNotesCtrl',
             templateUrl: 'public/modules/hobbys/views/hobby-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.hobbys',
                 serie: true,
                 files: [
                  'public/modules/hobbys/services/HobbyCommentManager.js',
                  'public/modules/hobbys/services/HobbyCommentsManager.js',
                  'public/modules/hobbys/controllers/HobbyCommentsCtrl.js',
                  'public/modules/hobbys/controllers/modals/HobbyCommentCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
  /*
   .state('apps.hobby.management', {
   url: '/tools',
   views: {
   "content": {
   //controller: 'HobbyTodosCtrl as hobbyTodosCtrl',
   templateUrl: 'public/modules/hobbys/views/hobby-managements.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.hobbys',
   serie: true,
   files: [
   //Todos
   'public/modules/hobbys/directives/todoEscape.js',
   'public/modules/hobbys/directives/todoFocus.js',
   'public/modules/hobbys/4services/HobbyTodoManager.js',
   'public/modules/hobbys/services/HobbyTodosManager.js',
   'public/modules/hobbys/services/HobbyTodoChecklistManager.js',
   'public/modules/hobbys/controllers/HobbyTodosCtrl.js',
   'public/modules/hobbys/controllers/modals/HobbyTodoCtrl.js',
   //Notes,
   'public/modules/hobbys/services/HobbyNoteManager.js',
   'public/modules/hobbys/services/HobbyNotesManager.js',
   'public/modules/hobbys/controllers/HobbyNotesCtrl.js',
   'public/modules/hobbys/controllers/modals/HobbyNoteCtrl.js',
   //Weblink
   'public/modules/hobbys/services/HobbyWeblinkManager.js',
   'public/modules/hobbys/services/HobbyWeblinksManager.js',
   'public/modules/hobbys/controllers/HobbyWeblinksCtrl.js',
   'public/modules/hobbys/controllers/modals/HobbyWeblinkCtrl.js',
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
